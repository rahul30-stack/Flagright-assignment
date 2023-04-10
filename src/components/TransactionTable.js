import React, { useState,useEffect,useRef } from "react";
import { getTransactions } from "./transaction";
import  './TransactionTable.css';


const TransactionTable = () => {
   
  const [arrayTransactionState, setarrayTransactionState] = useState([]);
  
  
  const [pageNumberState, setpageNumberState] = useState(
    Number(localStorage.getItem("pageNumber")) || 1);
    const [sortOrder, setSortOrder] = useState(false);
  const [filterValue, setFilterValue] = useState( localStorage.getItem("filterValue") || "");
  const debounceRef = useRef(false);

  

  useEffect(() => {
    getTransactions(pageNumberState,sortOrder).then((res) => setarrayTransactionState(res));
    localStorage.setItem("pageNumber", pageNumberState);
  }, [pageNumberState,sortOrder]);


 

  const handleFilter = (e) => {
   
    setFilterValue(e.target.value);
    
    const filteredArray = arrayTransactionState.data.filter((element) =>element.type&&
      element.type.toLowerCase().includes(e.target.value.toLowerCase()),
     
    );
    setarrayTransactionState({ ...arrayTransactionState,
      data: filteredArray?.length ? filteredArray : arrayTransactionState?.data, 
    });
    localStorage.setItem("filterValue", e.target.value);
  };
   useEffect(() => {
  const storedValue = localStorage.getItem("filterValue");
  if (storedValue) {
    setFilterValue(storedValue);
  }
}, []);


  const handleReset = () => {
    setFilterValue("");
    getTransactions(pageNumberState).then((res) =>
      setarrayTransactionState(res)
    );
    localStorage.removeItem("filterValue");
  };


  return (
    <div>
      <div className="site-logo">
    <img src="https://i.tracxn.com/logo/company/ec2aa1c3512bbd1e562ed655b79e4912?height=120&width=120" alt="logo"></img>
     </div>
      <label>Filter by Type:
        <input type="text" value={filterValue} onChange={handleFilter} /></label>
        <button className="reset" onClick={handleReset}>Clear </button>
          <table>
    <thead>
      <tr>
        <th >Transaction id</th>
        <th>Designation User</th>
        <th>OriginUserId</th>
        <th>Type</th>
        <th>Status</th>

      </tr>
    </thead>
    <tbody>
      {arrayTransactionState?.data?.map((element) => (
        
        <tr key={element?.transactionId}>
          <td>{element?.transactionId}</td>
          <td>{element?.destinationUserId}</td>
          <td>{element?.originUserId}</td>
          <td>{element?.type}</td>
          <td>{element?.status}</td>

        </tr>
        
      ))}
    </tbody>
  </table>
      
      
      <button className="aage"
        onClick={() => {
          if (debounceRef.current) {
            clearTimeout(debounceRef.current);
          }
          debounceRef.current = setTimeout(() => {
            setpageNumberState((prevState) => prevState + 1);
          }, 6000);
        }}
      >
      <p>   Next &#8594; </p>  
      </button>
      <button className="aage"
        onClick={() => {
          if (debounceRef.current) {
            clearTimeout(debounceRef.current);
          }
          debounceRef.current = setTimeout(() => {
            setpageNumberState((prevState) => prevState - 1);
          }, 6000);
        }}
      >
       <p>&#8592; Back </p> 
      </button>
      <button className="sort" onClick={() =>setSortOrder((ps)=>!ps)}>Sort by Status</button>
    </div>
  );
  
}
export default TransactionTable;
