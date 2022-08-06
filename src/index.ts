import { renderPage } from './components/page/page';
import { renderGarage } from './components/garage/garage';
import './style.scss';

import { getCars } from './services/api';
renderPage();
// console.log( getCars(2, 1) );

const garage = document.getElementById('garage') as HTMLDivElement;
garage.innerHTML = renderGarage();
