import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddOrder from "./pages/addOrder";
import OrderEdit from "./pages/orderEdit";
import OrderList from "./pages/orderList";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/addorder" component={AddOrder} />
          <Route path="/orderlist" component={OrderList} />
          <Route path="/orderedit/:id" component={OrderEdit} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
