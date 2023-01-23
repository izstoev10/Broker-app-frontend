import tenantData from 'shared/data/tenantData';

export default async function handler(req, res) {
    let tenants = await tenantData.getAll();
    res.status(200).json(tenants)
  }
  