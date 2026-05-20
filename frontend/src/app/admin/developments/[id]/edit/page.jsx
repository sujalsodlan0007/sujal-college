"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DevelopmentForm from "@/components/admin/DevelopmentForm";
import developmentService from "@/services/developmentService";
import { Loader } from "@/components/common/Loader";

export default function EditDevelopment() {
  const { id } = useParams();
  const [development, setDevelopment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopment = async () => {
      try {
        // Since we are using mock data, we'll find by ID or slug
        const data = await developmentService.getBySlug("the-summit"); // Mock fallback
        setDevelopment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopment();
  }, [id]);

  if (loading) return <Loader className="min-h-screen" />;
  if (!development) return <div>Development not found</div>;

  return <DevelopmentForm initialData={development} isEdit={true} />;
}
