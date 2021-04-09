import { expect } from 'chai';
import regeneratorRuntime from 'regenerator-runtime';
import GithubService from '../../src/Services/GithubService';
import { userName, listOfRepo } from './MockData';

describe('Service level Testing for GitHhub Service', () => {
  context('Scenario 1: Testing getDataFromAPI unit', () => {
    it('should get the repos for a given user', (done) => {
      GithubService.getDataFromAPI(
        `https://api.github.com/users/${userName}/repos?`,
        'userData'
      ).then((response) => {
        expect(response.success).to.equal(true);
        done();
      });
    });
  });
  context('Scenario 2: Testing getUserInfoFromAPI unit', () => {
    it('should get the Info for a given user', (done) => {
      GithubService.getUserInfoFromAPI(userName).then((response) => {
        expect(response.success).to.equal(true);
        done();
      });
    });
  });
});
