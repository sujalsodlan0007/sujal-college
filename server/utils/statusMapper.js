export const getStatusColor = (status) => {
  const map = {
    available: 'green',
    hold: 'amber',
    let_agreed: 'red',
    reserved: 'red',
    coming_soon: 'blue',
  };
  return map[status] || 'gray';
};

export const getEnquiryStatusLabel = (status) => {
  const map = {
    new: 'New Lead',
    contacted: 'Contacted',
    viewing_scheduled: 'Viewing Scheduled',
    reserved: 'Reserved',
    closed: 'Closed/Leased',
    lost: 'Lost',
  };
  return map[status] || status;
};
