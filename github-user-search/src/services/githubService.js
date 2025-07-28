import axios from "axios";

export async function fetchAdvancedUsers(username, location, minRepos) {
  const query = `${
    username ? username : ""
  }+location:${location}+repos:>${minRepos}`;
  const url = `https://api.github.com/search/users?q=${query}`;
  const response = await axios.get(url);
  return response.data;
}
