import "./AdminStats.css";
import{
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
}from "recharts";


function AdminStats(){
    const products=JSON.parse(localStorage.getItem("products"))||[];
     const orders=JSON.parse(localStorage.getItem("orders"))||[];
      const users=JSON.parse(localStorage.getItem("users"))||[];
      const revenue=orders.reduce((sum,o)=>sum+o.total,0);
      const productData=products.slice(0,5).map((p)=>({
        name:p.title,
        value:p.price,
      }));
      const orderData=orders.map((o,index)=>({
        name:"order"+(index+1),
        value:o.total,
      }));

return(
    <div className="container">
        <h2 className="heading">DASHBOARD</h2>
        <div className="card-container">
<div className="card blue">
    <h4>Products</h4>
    <h2>{products.length}</h2>

</div>
<div className="card orange">
    <h4>Orders</h4>
    <h2>{orders.length}</h2>

</div>
<div className="card green">
    <h4>users</h4>
    <h2>{users.length}</h2>

</div>
<div className="card red">
    <h4>Revenue</h4>
    <h2>{revenue}</h2>

</div>
</div>
<div className="chart-container">
<BarChart width={400} height={300} data={productData} > 
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="value"/>
  </BarChart>
<LineChart width={400} height={300} data={orderData}>
    <CartesianGrid strokeDasharray=" 3 3"/>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="value"/>
</LineChart>



  

  
        </div>

    </div>
);
}
export default AdminStats;