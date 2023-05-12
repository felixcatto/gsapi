import cn from 'classnames';
import { Link } from 'wouter';
import Layout from '../../common/layout.tsx';
import { getQueryParams, getUrl, useMergeState, useNavigate, useTable } from '../../lib/utils.tsx';
import { Pagination } from '../../ui/Pagination.tsx';
import s from './styles.module.css';
import { useRepositories } from './utils.tsx';

type IState = {
  stateInputValue: string;
  hasChanges: boolean;
};

export const Repositories = () => {
  const navigate = useNavigate();

  const [state, setState] = useMergeState<IState>({ stateInputValue: '', hasChanges: false });
  const { stateInputValue, hasChanges } = state;

  const queryParams = getQueryParams();
  const searchQuery = queryParams.get('searchQuery') || '';
  const inputValue = hasChanges ? stateInputValue : searchQuery;

  const { data, isLoading } = useRepositories(searchQuery);

  const { rows, totalRows, paginationProps } = useTable({
    rows: data,
    page: 0,
    size: 10,
  });

  const onSearchKeydown = e => {
    if (e.code !== 'Enter') return;
    onSearchClick();
  };
  const onSearchChange = e => setState({ stateInputValue: e.target.value, hasChanges: true });
  const onSearchClick = () => navigate(getUrl('repositories', {}, { searchQuery: inputValue }));

  return (
    <Layout>
      <div className="flex flex-col justify-between items-center mb-5 md:flex-row">
        <h2>Github Repositores</h2>
        <div className="flex">
          <div className="relative">
            <input
              type="text"
              className="input pr-9"
              placeholder="Enter repo name"
              onChange={onSearchChange}
              onKeyDown={onSearchKeydown}
              value={inputValue}
            />
            {isLoading && <div className={cn('spinner spinner_sm', s.searchSpinner)}></div>}
          </div>
          <div className="btn ml-4" onClick={onSearchClick}>
            Search
          </div>
        </div>
      </div>

      <div className="w-0 min-w-full overflow-x-auto">
        <table className={cn('table-fixed', s.reposTable)}>
          <thead>
            <tr>
              <th className="w-4/12">Repo Name</th>
              <th className="w-2/12">Stars</th>
              <th className="w-3/12">Last Commit</th>
              <th className="w-3/12">Github Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(repo => (
              <tr key={repo.id}>
                <td>
                  <Link
                    className="w-full truncate"
                    to={getUrl(
                      'repository',
                      { id: repo.id },
                      { owner: repo.ownerName, repo: repo.name }
                    )}
                  >
                    {repo.full_name}
                  </Link>
                </td>
                <td>{repo.stars}</td>
                <td>{repo.lastCommitDate}</td>
                <td>
                  <a href={repo.html_url} target="_blank">
                    {repo.ownerName}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalRows !== 0 && (
        <Pagination
          {...paginationProps}
          className="mt-3"
          totalRows={totalRows}
          availableSizes={[3, 10, 20, 50]}
        />
      )}
    </Layout>
  );
};
