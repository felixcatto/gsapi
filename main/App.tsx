import originalAxios from 'axios';
import { SWRConfig } from 'swr';
import { Route, Switch } from 'wouter';
import { IContext } from '../lib/types.js';
import { Context, routes } from '../lib/utils.js';
import { Repositories } from '../pages/repositories/index.jsx';
import { Repository } from '../pages/repositories/repository.jsx';

function App() {
  const axios = originalAxios.create();
  axios.interceptors.response.use(
    response => response.data,
    error => {
      console.log(error.response);
      return Promise.reject(error);
    }
  );

  const contextStore: IContext = { axios };

  const swrConfig = { fetcher: axios.get, revalidateOnFocus: false };

  return (
    <Context.Provider value={contextStore}>
      <SWRConfig value={swrConfig}>
        <Switch>
          <Route path={routes.home} component={Repositories} />
          <Route path={routes.repositories} component={Repositories} />
          <Route path={routes.repository} component={Repository} />
        </Switch>
      </SWRConfig>
    </Context.Provider>
  );
}

export default App;
