import React, { useState } from 'react'
import { ListComp } from "../common/ListComp";
import tenantData from '../../shared/data/tenantData'


const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if(tenants.length === 0) {
    var resultPromise = tenantData.getAllAsync()
    resultPromise.then((result) => { 
      setIsLoading(false);
      setTenants(result.payload);
  })
  }
  
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'first_name',
          headerName: 'First name',
          width: 200,
          editable: true,
        },
        {
          field: 'last_name',
          headerName: 'Last name',
          width: 200,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
          editable: true,
        },
        {
          field: 'phone',
          headerName: 'Phone',
          type: 'number',
          width: 120,
          editable: true,
        },
        {
          field: 'has_kids',
          headerName: 'Kids',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'has_pets',
          headerName: 'Pets',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'created_at',
          headerName: 'Created At',
          type: 'date',
          width: 150,
          editable: true,
        },
    ];
    

  return (
    <ListComp 
      columns={columns}
       data={tenants}
       isLoading={isLoading}
    />
  );
}

export default Tenants