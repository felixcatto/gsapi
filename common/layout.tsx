import cn from 'classnames';
import { getUrl, NavLink, popoverRootId } from '../lib/utils.js';
import s from './layout.module.css';
import viteLogo from '/img/vite.svg';

const Layout = ({ children }: any) => {
  return (
    <div className={s.app}>
      <div className={s.header}>
        <div className={cn('container', s.headerFg)}>
          <div className="flex items-center">
            <img src={viteLogo} className={cn('mr-7', s.logo)} alt="Vite logo" />
            <div className="flex">
              <NavLink to={getUrl('home')}>Repositories</NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className={cn('container', s.content)}>{children}</div>
      <div id={popoverRootId}></div>
    </div>
  );
};

export default Layout;
