import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddOrder from "./pages/addOrder";
import OrderList from "./pages/orderList";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/addorder" component={AddOrder} />
          <Route path="/orderlist" component={OrderList} />
          <Route path="/orderedit" component={OrderList} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
