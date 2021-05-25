import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import AddOrder from "./pages/addOrder";

import OrderEdit from "./pages/orderEdit";
import OrderList from "./pages/orderList";
import OrderListRaw from "./pages/OrderListRaw";
import OrderRing from "./pages/orderRing";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/addorder" component={AddOrder} />
          <Route exact path="/" component={OrderList} />
          <Route exact path="/orderedit/:id" component={OrderEdit} />
          <Route exact path="/orderring/" component={OrderRing} />
          <Route exact path="/all" component={OrderListRaw} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
