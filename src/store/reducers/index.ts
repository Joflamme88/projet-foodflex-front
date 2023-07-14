import profilReducer from './profil';
import homeReducer from './home';
import recipesReducer from './recipes';
import settingsReducer from './settings';
import favorisReducer from './favoris';
import windowReducer from './window';
import scheduleReducer from './schedule';

const reducer = {
  recipes: recipesReducer,
  settings: settingsReducer,
  window: windowReducer,
  profil: profilReducer,
  favoris: favorisReducer,
  schedule: scheduleReducer,
  home: homeReducer,
};

export default reducer;