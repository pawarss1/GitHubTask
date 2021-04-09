import { expect } from 'chai';
import regeneratorRuntime from 'regenerator-runtime';
import UserService from '../../src/Services/UserService';
import { userName, listOfRepo } from './MockData';

describe('Service level Testing for UserService', () => {
  context('Scenario 1: Testing getReposForUser unit', () => {
    it('should get the repos for a given user', (done) => {
      UserService.getReposForUser(userName).then((response) => {
        expect(response.success).to.equal(true);
        done();
      });
    });
  });
  context('Scenario 2: Testing getFilteredData unit', () => {
    it('should give the filtered List of Repos', (done) => {
      const response = UserService.getFilteredData(listOfRepo);
      expect(response.length).to.equal(1);
      done();
    });
  });
  context('Scenario 3: Testing getUserInfo unit', () => {
    it('should get the information for a given user', (done) => {
      UserService.getUserInfo(userName).then((response) => {
        expect(response.success).to.equal(true);
        done();
      });
    });
  });
});
