import { Link } from 'wouter';
import Layout from '../../common/layout.tsx';
import { getQueryParams, getUrl } from '../../lib/utils.tsx';
import s from './styles.module.css';
import { useRepository } from './utils.tsx';

export const Repository = () => {
  const queryParams = getQueryParams();
  const owner = queryParams.get('owner');
  const repoQuery = queryParams.get('repo');

  const { data: repo, isLoading } = useRepository(owner, repoQuery);

  if (isLoading) return loadingLayout;

  return (
    <Layout>
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="flex justify-center md:justify-start">
            <img src={repo?.ownerAvatar} alt="" className="w-80 border rounded-md mb-4" />
          </div>
          <div className="flex text-lg">
            <div className="mr-2">Owner:</div>
            <div>
              <a href={repo?.ownerLink} target="_blank">
                <span>{repo?.ownerName}</span>
                <i className="fa fa-house-chimney-user ml-2"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex text-lg">
              <span className="mr-2">Repo Name:</span>
              <span className="text-primary font-bold">{repo?.name}</span>
            </div>
            <Link
              to={getUrl('repositories', {}, { searchQuery: repoQuery })}
              className="btn-outline hidden md:inline-block"
            >
              Back
            </Link>
          </div>

          <div className="flex mb-1">
            <div className="mr-2">Stars:</div>
            <div>
              <span>{repo?.stars}</span>
              <i className="fa fa-star ml-1"></i>
            </div>
          </div>

          <div className="flex mb-1">
            <div className="mr-2">Last Commit:</div>
            <div>{repo?.lastCommitDate}</div>
          </div>

          <div className="flex mb-6">
            <div className="mr-2">Description:</div>
            <div>{repo?.description}</div>
          </div>

          <div className="mb-2">Used Languages:</div>

          <div>
            {repo?.languages.map(el => (
              <div key={el.name} className={s.languageBadge}>
                <span className="mr-2">{el.name}</span>
                <span className="text-blue-300 font-bold">{el.usagePercent}%</span>
              </div>
            ))}
          </div>

          <div className="text-right mt-2 md:hidden">
            <Link
              to={getUrl('repositories', {}, { searchQuery: repoQuery })}
              className="btn-outline"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const loadingLayout = (
  <Layout>
    <div className="flex justify-center">
      <div className="spinner"></div>
    </div>
  </Layout>
);
