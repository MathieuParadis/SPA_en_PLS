import { Home } from './Home';
import { PageDetail } from './PageDetail';
import { PageList } from './PageList';

const routes = {
  "": Home(1),
  "pagelist": PageList,
  "pagedetail": PageDetail,
};

export { routes };