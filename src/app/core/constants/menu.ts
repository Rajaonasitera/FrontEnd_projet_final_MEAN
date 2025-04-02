import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Nos services',
      route: '/client/service',
      separator: false,
      isAdmin: false,
      isClient: true,
      isMeca: false
    },
    {
      group: 'Produits',
      route: '/client/produits',
      separator: false,
      isAdmin: false,
      isClient: true,
      isMeca: false
    },
    {
      group: 'Dashboard',
      route: '/admin/dashboard',
      separator: false,
      isAdmin: true,
      isClient: false,
      isMeca: false
    },
    {
      group: 'Liste clients',
      route: '/admin/liste-clients',
      separator: false,
      isAdmin: true,
      isClient: false,
      isMeca: false
    },
    {
      group: 'Rendez vous',
      route: '/admin/liste-rendezvous',
      separator: false,
      isAdmin: true,
      isClient: false,
      isMeca: false
    },
    {
      group: 'Liste produits',
      route: '/admin/liste-produits',
      separator: false,
      isAdmin: true,
      isClient: false,
      isMeca: false
    },
    {
      group: 'Liste service',
      route: '/admin/liste-services',
      separator: false,
      isAdmin: true,
      isClient: false,
      isMeca: false
    },
    // {
    //   group: 'Liste reparation',
    //   route: '/admin/liste-reparations',
    //   separator: false,
    //   isAdmin: true,
    //   isClient: false,
    //   isMeca: false
    // },
    {
      group: 'Liste rendez vous',
      route: '/meca/rdv',
      separator: false,
      isAdmin: false,
      isClient: false,
      isMeca: true
    },
    {
      group: 'Liste voitures',
      route: '/meca/liste-voitures',
      separator: false,
      isAdmin: false,
      isClient: false,
      isMeca: true
    },
  ];
}
