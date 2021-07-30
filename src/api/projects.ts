import { fetchData, SideProject } from "./github";

type Projects =
  | "blenderresourcesTest"
  | "osmosfeed"
  | "webtoolsTest"
  | "favdevPortfolios"
  | "nuxthNews";

type Response = {
  user: {
    [key in Projects]: SideProject;
  };
};

export const fetchProjects = async () => {
  const fields = `id
      name
      description
      url
      stargazers {
        totalCount
      }`;

  const query = `
query {
  user (login: "22940dev") {
    blenderresourcesTest: repository(name: "blender-resources-test") {
      ${fields}
    }
    osmosfeed: repository(name: "osmosfeed") {
      ${fields}
    }
    webtoolsTest: repository(name: "webtools-test") {
      ${fields}
    }
    favdevPortfolios: repository(name: "fav-dev-portfolios") {
      ${fields}
    }
    nuxthNews: repository(name: "nuxt-hnews") {
      ${fields}
    }
  }
}`;

  const data = await fetchData<Response>(query);

  return {
    projects: [
      data.user.blenderresourcesTest,
      data.user.osmosfeed,
      data.user.webtoolsTest,
      data.user.favdevPortfolios,
      data.user.nuxthNews,
    ],
  };
};
