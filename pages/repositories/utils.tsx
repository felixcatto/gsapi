import { isEmpty, orderBy } from 'lodash-es';
import useSWR from 'swr';
import { IRepository, IRepositoryFull } from '../../lib/types.ts';
import { fmtISO, formatNumber, getApiUrl, roundNumber, sortOrders } from '../../lib/utils.tsx';

export const useRepositories = searchQuery => {
  const { data: rawData, isLoading } = useSWR(
    searchQuery && getApiUrl('searchRepos', {}, { q: searchQuery, per_page: 40 })
  );

  const data = transformRepos(rawData);
  return { data, isLoading };
};

export const useRepository = (owner, repo) => {
  const { data: rawData, isLoading: isLoadingRepo } = useSWR(getApiUrl('repo', { owner, repo }));
  const { data: languages, isLoading: isLoadingLaguages } = useSWR(
    getApiUrl('repoLanguages', { owner, repo })
  );

  const isLoading = isLoadingRepo || isLoadingLaguages;
  const data = rawData ? transformRepo(rawData) : null;
  if (!data || !languages) return { data: null, isLoading };

  const fullData: IRepositoryFull = { ...data, languages: getLanguagesPercents(languages) };
  return { data: fullData, isLoading };
};

const transformRepos = (data): IRepository[] => {
  if (isEmpty(data)) return [];

  const tmpData = data.items.map(transformRepo);
  return orderBy(tmpData, 'stargazers_count', sortOrders.desc);
};

const transformRepo = (repo): IRepository => ({
  id: repo.id,
  name: repo.name,
  full_name: repo.full_name,
  stargazers_count: repo.stargazers_count,
  stars: formatNumber(repo.stargazers_count, 1),
  pushed_at: repo.pushed_at,
  lastCommitDate: fmtISO(repo.pushed_at, 'dd MMM yyyy'),
  html_url: repo.html_url,
  description: repo.description,
  ownerName: repo.owner.login,
  ownerLink: repo.owner.html_url,
  ownerAvatar: repo.owner.avatar_url,
});

const getLanguagesPercents = languages => {
  const totalLines = Object.keys(languages).reduce((acc, key) => acc + languages[key], 0);
  return Object.keys(languages)
    .map(language => ({
      name: language,
      usagePercent: roundNumber((languages[language] / totalLines) * 100, 1),
    }))
    .filter(el => el.usagePercent !== 0);
};
