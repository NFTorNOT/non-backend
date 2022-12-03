let currentWordOfTheDay = null;

/**
 * Class to provide config
 *
 * @class InMemoryCache
 */
class InMemoryCache {
  constructor() {
  }

  getCurrentWordOfTheDay() {
    return currentWordOfTheDay;
  }

  setCurrentWordOfTheDay(value){
    currentWordOfTheDay = value;
  }
  
}

module.exports = new InMemoryCache();