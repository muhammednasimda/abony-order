import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddOrder from "./pages/addOrder";

import OrderEdit from "./pages/orderEdit";
import OrderList from "./pages/orderList";
import OrderRing from "./pages/orderRing";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/addorder" component={AddOrder} />
          <Route exact path="/" component={OrderList} />
          <Route exact path="/orderedit/:id" component={OrderEdit} />
          <Route exact path="/orderring/" component={OrderRing} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
