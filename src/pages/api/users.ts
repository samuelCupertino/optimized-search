import type { NextApiRequest, NextApiResponse } from 'next'

const USERS = [
  {
    id: '68098853-0fd4-45d9-aeff-a885d25a3de2',
    avatar: 'https://randomuser.me/api/portraits/men/0.jpg',
    name: 'Basile Marchand',
    email: 'basile.marchand@example.com',
  },
  {
    id: 'f0cf957b-e587-4cbe-bec4-a7632f95bf95',
    avatar: 'https://randomuser.me/api/portraits/women/0.jpg',
    name: 'Ece Paksüt',
    email: 'ece.paksut@example.com',
  },
  {
    id: 'c880b8e6-701f-4451-b466-01770889f4e4',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Laurie Anderson',
    email: 'laurie.anderson@example.com',
  },
  {
    id: '3eb83135-6781-4fde-b250-77d42193f084',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'Dejan Španović',
    email: 'dejan.spanovic@example.com',
  },
  {
    id: '3324a726-96db-4b17-94e2-42c08f771d5e',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Noah Reed',
    email: 'noah.reed@example.com',
  },
  {
    id: '2f92ea67-cdb4-420b-9fd7-4e6bd12b60fb',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Kathryn Frazier',
    email: 'kathryn.frazier@example.com',
  },
  {
    id: '8191e0a2-21c0-4366-aff0-08717fb650bc',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Pola Jafari',
    email: 'pola.jafari@example.com',
  },
  {
    id: '11f6a537-1a9d-4efa-8f99-b96211fa6056',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Snizhan Rizhuk',
    email: 'snizhan.rizhuk@example.com',
  },
  {
    id: '695dde39-d380-4f9c-bab9-f8257b3ce742',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'Jeffrey Jordan',
    email: 'jeffrey.jordan@example.com',
  },
  {
    id: '7b5fd59a-0e8b-465a-98e8-0c0d648f473e',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'María Rivas',
    email: 'maria.rivas@example.com',
  },
  {
    id: '6f289382-03c3-43c2-bfbf-70bf80dcb526',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Carmen Lira',
    email: 'carmen.lira@example.com',
  },
  {
    id: '54bfa24d-f051-43b3-bfeb-ce94f785cfbd',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    name: 'Troy Torres',
    email: 'troy.torres@example.com',
  },
  {
    id: 'aca3ec5f-405b-49c6-879a-890dc8c02df6',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    name: 'سورنا سهيلي راد',
    email: 'swrn.shylyrd@example.com',
  },
  {
    id: '79c64cd1-bd7d-4c8a-b7d8-587b8809913d',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Laura Jørgensen',
    email: 'laura.jorgensen@example.com',
  },
  {
    id: '271185b2-d81a-4cf1-b00b-7ea5ad7e0249',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    name: 'Lena Simmons',
    email: 'lena.simmons@example.com',
  },
  {
    id: '7870cb01-5bfe-4606-a785-031e70dd0dc0',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Gustav Møller',
    email: 'gustav.moller@example.com',
  },
  {
    id: '4c0687b1-f737-4a93-b420-df1d35a971c7',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    name: 'احسان کوتی',
    email: 'hsn.khwty@example.com',
  },
  {
    id: '726a9cdb-6029-4559-b82e-c48a026ddc56',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    name: 'Norma Villagómez',
    email: 'norma.villagomez@example.com',
  },
  {
    id: '3599d7c1-a202-48af-8d77-5342a64857b8',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    name: 'Cassandra Barbier',
    email: 'cassandra.barbier@example.com',
  },
  {
    id: '858b29b5-bd0c-499a-bd18-0d19e07621da',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'Allan Craig',
    email: 'allan.craig@example.com',
  },
  {
    id: 'b9ca7d2f-9f04-455a-8c36-b1f2e70f7569',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    name: 'Marisela Lemus',
    email: 'marisela.lemus@example.com',
  },
  {
    id: '5dbc44cb-91dd-426e-af68-47c4a92dde6e',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Daniel Remes',
    email: 'daniel.remes@example.com',
  },
  {
    id: 'b8168d87-03a6-490e-bf43-b59b1232ffc4',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    name: 'Dorogobug Litvinovich',
    email: 'dorogobug.litvinovich@example.com',
  },
  {
    id: '317f6301-c534-48a7-8b5f-49f41e186ce2',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    name: 'Anaëlle Philippe',
    email: 'anaelle.philippe@example.com',
  },
  {
    id: 'd3a7d477-b519-4610-b3c1-8d11088a6db6',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    name: 'Mathis Gagnon',
    email: 'mathis.gagnon@example.com',
  },
  {
    id: '1211c633-64c0-42a1-aa85-9b2a6f360461',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Angela Williams',
    email: 'angela.williams@example.com',
  },
  {
    id: '5a205fad-cac2-4911-a44a-f79f4ec6b62d',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    name: 'Janne Fonnes',
    email: 'janne.fonnes@example.com',
  },
  {
    id: '74c8c581-02b0-4623-a0f6-e2b3904eb00c',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    name: 'Kuzey Kulaksızoğlu',
    email: 'kuzey.kulaksizoglu@example.com',
  },
  {
    id: '240f4278-8054-4e0a-a027-2a96f38e9fc3',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    name: 'Alicia Bélanger',
    email: 'alicia.belanger@example.com',
  },
  {
    id: '240f4278-8054-4e0a-a027-2a96f38e9fc3',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    name: 'Matheus Santos',
    email: 'matheus.santos@example.com',
  },
  {
    id: 'cd925052-d1d5-4a4c-8d9d-1118ef6d2f8b',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    name: 'Leonard Craig',
    email: 'leonard.craig@example.com',
  },
  {
    id: '9aa84516-79b4-4575-8ad4-21078d3013b5',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    name: 'Daniella Ottersen',
    email: 'daniella.ottersen@example.com',
  },
  {
    id: '142861d4-8616-443c-b574-0bafb2113996',
    avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
    name: 'Garance Fernandez',
    email: 'garance.fernandez@example.com',
  },
  {
    id: '98e3c10d-5f93-4b56-822b-3037e204a969',
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
    name: 'Esteban Soler',
    email: 'esteban.soler@example.com',
  },
  {
    id: '6ad77755-89d7-4688-95fe-02828b0be0e2',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    name: 'النا سلطانی نژاد',
    email: 'ln.sltnynjd@example.com',
  },
  {
    id: '3c024aa2-bfd2-4360-9bba-3c08503c7f75',
    avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    name: "P'ier Antipenko",
    email: "p'ier.antipenko@example.com",
  },
  {
    id: '61cc13e0-f6f3-4d78-9098-d7d00ee98e6f',
    avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
    name: 'Mathilde Andersen',
    email: 'mathilde.andersen@example.com',
  },
  {
    id: 'af824014-947b-4f1e-9efd-2e1aa5ba3994',
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    name: 'Yash Saha',
    email: 'yash.saha@example.com',
  },
  {
    id: '326c67dc-5f88-4e35-97b8-ae3d09232acc',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    name: 'Ege Tunçeri',
    email: 'ege.tunceri@example.com',
  },
  {
    id: 'a7961916-4ef4-432e-89f6-750ee735faeb',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    name: 'Roxan Kleijweg',
    email: 'roxan.kleijweg@example.com',
  },
  {
    id: 'f43a1f9a-be0d-48c0-b30e-c7e01591df3d',
    avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
    name: 'Emma Harvey',
    email: 'emma.harvey@example.com',
  },
  {
    id: '928fcc82-299b-4da1-99a7-d2f8dc9f52b1',
    avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
    name: 'Friedhelm Brinkmann',
    email: 'friedhelm.brinkmann@example.com',
  },
  {
    id: '657de65c-280b-4692-800a-afae133b8fc6',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    name: 'Olive Jones',
    email: 'olive.jones@example.com',
  },
  {
    id: 'f15c1fcb-5e4c-4be1-a6e2-8241bbb19964',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    name: 'Jorge Luis Rosas',
    email: 'jorgeluis.rosas@example.com',
  },
  {
    id: 'd0f1b07c-0d01-4df4-bb62-98ce22972c92',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    name: 'Ellen Eskola',
    email: 'ellen.eskola@example.com',
  },
  {
    id: '19fbb2f9-159f-401f-aae4-90c5888bc133',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Ishan Mathijsen',
    email: 'ishan.mathijsen@example.com',
  },
  {
    id: '7a878416-03da-4535-854b-5c6077e840dc',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    name: 'آوا نكو نظر',
    email: 'aw.nkwnzr@example.com',
  },
  {
    id: '76bdf527-e89c-49cc-8e1f-9164a0ef11b6',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    name: 'Jaime Rodríguez',
    email: 'jaime.rodriguez@example.com',
  },
  {
    id: '197cff63-77c2-4d75-b91d-f5a5de2f1f32',
    avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
    name: 'Willard Cole',
    email: 'willard.cole@example.com',
  },
  {
    id: '1f9cf24b-b47f-4e11-8de8-817adc190335',
    avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
    name: 'Milja Manner',
    email: 'milja.manner@example.com',
  },
  {
    id: '210fecd0-4172-47a5-9725-8de4f73842b2',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    name: 'Élodie Carpentier',
    email: 'elodie.carpentier@example.com',
  },
  {
    id: '3ac0f85a-c092-4fbd-abe5-24837855933a',
    avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
    name: 'Tim Little',
    email: 'tim.little@example.com',
  },
  {
    id: '0ed02300-ca0d-485e-ae11-f15b0e8b239f',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    name: 'Maeva Anderson',
    email: 'maeva.anderson@example.com',
  },
  {
    id: '827c7d0c-aebb-4cc5-98ba-8220e0f6af69',
    avatar: 'https://randomuser.me/api/portraits/men/26.jpg',
    name: 'Kasper Saarinen',
    email: 'kasper.saarinen@example.com',
  },
  {
    id: '75c2ac23-8188-4d8f-8c64-fd805071c76d',
    avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    name: 'Jeanette Wilke',
    email: 'jeanette.wilke@example.com',
  },
  {
    id: 'b3e4efe5-a6cc-477e-8eac-683a6307a9bc',
    avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
    name: 'Ross Shelton',
    email: 'ross.shelton@example.com',
  },
  {
    id: '39d399f3-bc30-4303-94b1-29bcd6c61741',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    name: 'Chloe James',
    email: 'chloe.james@example.com',
  },
  {
    id: 'e4a67525-5c32-43f4-8819-13ce706b0d18',
    avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
    name: 'Steve Brewer',
    email: 'steve.brewer@example.com',
  },
  {
    id: '34c1e65b-95a7-4698-a903-20a1958eb98f',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    name: 'Sophia Pierre',
    email: 'sophia.pierre@example.com',
  },
  {
    id: '92accc3d-9c1b-4abf-89ff-33d240c42f84',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    name: 'Onni Hanka',
    email: 'onni.hanka@example.com',
  },
  {
    id: '330f7969-c7e7-4b02-aeb6-d6877b44e561',
    avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
    name: 'Sadie Evans',
    email: 'sadie.evans@example.com',
  },
  {
    id: 'eedf85e2-1304-473b-a8a5-05b729b3bd93',
    avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
    name: 'Abeer Dalvi',
    email: 'abeer.dalvi@example.com',
  },
  {
    id: '2d394f9a-a70f-4f53-858e-b30877b92295',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    name: 'Helmuth Posselt',
    email: 'helmuth.posselt@example.com',
  },
  {
    id: 'aa0dae69-aa67-419d-a191-b24a4dfb0531',
    avatar: 'https://randomuser.me/api/portraits/women/31.jpg',
    name: 'Roberta Little',
    email: 'roberta.little@example.com',
  },
  {
    id: '544be395-d9d6-4ddc-8646-c3aaf833fe5e',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    name: 'Kate Lee',
    email: 'kate.lee@example.com',
  },
  {
    id: 'd07a968f-58f6-4d47-a82e-8f8f48883e72',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Jeff Harvey',
    email: 'jeff.harvey@example.com',
  },
  {
    id: '153a7e25-593d-4cc3-b427-76042c76574d',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    name: 'فاطمه نجاتی',
    email: 'ftmh.njty@example.com',
  },
  {
    id: '352ed794-59cb-4251-8827-48435ad83858',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    name: 'Svitoyar Bunyak',
    email: 'svitoyar.bunyak@example.com',
  },
  {
    id: '8a24b902-48d5-46d5-bb67-de70327ff206',
    avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    name: 'النا جعفری',
    email: 'ln.jaafry@example.com',
  },
  {
    id: '91f2bd83-98b2-41cb-ba3e-af19532c1653',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    name: 'Álvaro Esteban',
    email: 'alvaro.esteban@example.com',
  },
  {
    id: '47213788-4199-4731-9a06-9c4a28bf4282',
    avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
    name: 'Sonali Ramesh',
    email: 'sonali.ramesh@example.com',
  },
  {
    id: '74660e2b-4f32-4381-b4c0-986925420967',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    name: 'Gordon Miles',
    email: 'gordon.miles@example.com',
  },
  {
    id: '8b36f64c-57fb-4a52-a020-db3166b34c49',
    avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
    name: 'Suzana Krasić',
    email: 'suzana.krasic@example.com',
  },
  {
    id: '76737327-49a2-4c44-97a4-3688524f8daa',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    name: 'Murat Mayhoş',
    email: 'murat.mayhos@example.com',
  },
  {
    id: '05426da5-4ead-48b6-8649-3a15adc72638',
    avatar: 'https://randomuser.me/api/portraits/men/37.jpg',
    name: 'Nixon Lewis',
    email: 'nixon.lewis@example.com',
  },
  {
    id: '94ae338c-454d-4927-be88-2a95a5a70a7e',
    avatar: 'https://randomuser.me/api/portraits/women/37.jpg',
    name: 'Avreliya Zinkevich',
    email: 'avreliya.zinkevich@example.com',
  },
  {
    id: '0aa55e61-6310-4358-b0ec-e9a8a522c7a0',
    avatar: 'https://randomuser.me/api/portraits/women/38.jpg',
    name: 'Madeleine Green',
    email: 'madeleine.green@example.com',
  },
  {
    id: 'df749445-2697-4ede-8763-a4cdcc291c8a',
    avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
    name: 'Rudra Sheikh',
    email: 'rudra.sheikh@example.com',
  },
  {
    id: '00881cdd-d3a3-4cdb-957a-94f7ca57678d',
    avatar: 'https://randomuser.me/api/portraits/women/39.jpg',
    name: 'Sofia Nguyen',
    email: 'sofia.nguyen@example.com',
  },
  {
    id: '51ad770c-a51a-4155-adc2-aac1af9ef849',
    avatar: 'https://randomuser.me/api/portraits/men/39.jpg',
    name: 'Justin Flesland',
    email: 'justin.flesland@example.com',
  },
  {
    id: 'e07a21c8-3975-4719-afdf-e467f22e59f7',
    avatar: 'https://randomuser.me/api/portraits/women/40.jpg',
    name: 'Katarzyna Van der Tak',
    email: 'katarzyna.vandertak@example.com',
  },
  {
    id: '3bd5f6fa-e820-4dee-88a4-a3c478826da4',
    avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
    name: 'علی پارسا',
    email: 'aaly.prs@example.com',
  },
  {
    id: '83339dda-65fa-4734-8b9f-afa99285f74f',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    name: 'Milutin Ćirić',
    email: 'milutin.ciric@example.com',
  },
  {
    id: 'a10217dd-2ef2-41ec-bca5-d232bf4264f1',
    avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
    name: 'Jerusa Silva',
    email: 'jerusa.silva@example.com',
  },
  {
    id: 'a96288e6-b84e-497a-bbc8-759dc1e3978e',
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    name: 'Sophia Ambrose',
    email: 'sophia.ambrose@example.com',
  },
  {
    id: '33f8fb0e-f68d-433d-9b69-f0aeb9682e42',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    name: 'Lenny Martinez',
    email: 'lenny.martinez@example.com',
  },
  {
    id: 'c10a3a28-acad-48bb-b569-f00b233a4a8f',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    name: 'Richard Wong',
    email: 'richard.wong@example.com',
  },
  {
    id: '89744f6b-4c3b-4467-8a62-27d0af950663',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    name: 'Madison Macdonald',
    email: 'madison.macdonald@example.com',
  },
  {
    id: '565d0b0c-3fd8-4125-820b-e502dcaabee0',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Marija Abramović',
    email: 'marija.abramovic@example.com',
  },
  {
    id: '564438e0-1304-493f-b722-765761102afb',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    name: 'Simeon Teodosić',
    email: 'simeon.teodosic@example.com',
  },
  {
    id: '7f3dd8a7-d4b8-4959-8378-2fcec7132888',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    name: 'Katherine Russell',
    email: 'katherine.russell@example.com',
  },
  {
    id: 'cabe7881-2736-4796-a369-5eaf4ddcf05c',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Elias Ojala',
    email: 'elias.ojala@example.com',
  },
  {
    id: '67ed485f-3d86-4ebe-b3b8-3a2dd33f911f',
    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    name: 'Lea Sørensen',
    email: 'lea.sorensen@example.com',
  },
  {
    id: '00d93ada-2e6a-4580-94c0-ff5dc7bbfc62',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: 'William Lefevre',
    email: 'william.lefevre@example.com',
  },
  {
    id: '8d5d40a0-4e15-4e03-ad63-b6ac15c1a4e7',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
    name: 'Gül Akışık',
    email: 'gul.akisik@example.com',
  },
  {
    id: '8cb78ede-76ac-4647-8990-12c5957d70bd',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
    name: 'Zdravko Lazić',
    email: 'zdravko.lazic@example.com',
  },
  {
    id: 'd67021e1-07ee-49b8-8065-f0b5a1ca9946',
    avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
    name: 'Marcos Boyer',
    email: 'marcos.boyer@example.com',
  },
  {
    id: '9d06f0ad-bec2-408a-965d-096837f3862e',
    avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    name: 'Evita Wissing',
    email: 'evita.wissing@example.com',
  },
  {
    id: 'd01953ed-8fb3-4109-a935-a679c30ea9d4',
    avatar: 'https://randomuser.me/api/portraits/men/49.jpg',
    name: 'حامد گلشن',
    email: 'hmd.glshn@example.com',
  },
  {
    id: '4931c157-951d-4a58-a1e7-7518c94fd811',
    avatar: 'https://randomuser.me/api/portraits/women/49.jpg',
    name: 'مریم موسوی',
    email: 'mrym.mwswy@example.com',
  },
  {
    id: '9535324e-0a94-4a4d-9ce9-3400c7ba1bbc',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    name: 'Reina Riojas',
    email: 'reina.riojas@example.com',
  },
  {
    id: '12bc90b3-0c45-41bc-87c2-6374e019ffdc',
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    name: 'Landon Reynolds',
    email: 'landon.reynolds@example.com',
  },
  {
    id: '18b7cfdc-bcd2-4a42-8d23-10fbfda69b71',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    name: 'Gustav Petersen',
    email: 'gustav.petersen@example.com',
  },
  {
    id: 'f1d922a3-8ab2-4465-81a2-f869874085a0',
    avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
    name: 'Radomira Volinec',
    email: 'radomira.volinec@example.com',
  },
  {
    id: 'e921e36e-9170-4230-94f8-5179a382b5b8',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    name: 'Harrison Wang',
    email: 'harrison.wang@example.com',
  },
  {
    id: 'e921e36e-9170-4230-94f8-5179a382b5b9',
    avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    name: 'Maria Aparecida',
    email: 'Maria.Aparecida@example.com',
  },
  {
    id: 'b19ac0de-06d3-48c3-977c-56ac2aa9c9f7',
    avatar: 'https://randomuser.me/api/portraits/women/53.jpg',
    name: 'Ruth Mager',
    email: 'ruth.mager@example.com',
  },
  {
    id: '2f9a34d1-2ae9-439d-a3e3-2b5eaa0fc225',
    avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
    name: 'Edwin Hale',
    email: 'edwin.hale@example.com',
  },
  {
    id: '84164894-6a5c-4d50-af08-d47a365304f7',
    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    name: 'Diane Hunter',
    email: 'diane.hunter@example.com',
  },
  {
    id: '414ca02b-ba05-4e3a-936e-3af864165d51',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    name: 'Yandel Barreto',
    email: 'yandel.barreto@example.com',
  },
  {
    id: '12050943-0b91-4204-8050-393b120814bc',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    name: 'Önal Abacı',
    email: 'onal.abaci@example.com',
  },
  {
    id: '4503bb70-b550-4c4f-8ad7-b1a9c12b3f1c',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    name: 'Adna Hovdal',
    email: 'adna.hovdal@example.com',
  },
  {
    id: '3b56762c-3c19-40e4-9625-b76e7b1ed1a1',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    name: 'Justin Holland',
    email: 'justin.holland@example.com',
  },
  {
    id: 'c781779c-e6bf-4aba-8709-a9fa0dc937a3',
    avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
    name: 'نازنین حسینی',
    email: 'nznyn.hsyny@example.com',
  },
  {
    id: 'a5d46ca1-6eaa-418e-94f7-034fec381dc9',
    avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
    name: 'Babür Atakol',
    email: 'babur.atakol@example.com',
  },
  {
    id: '00586f40-1c1b-4acc-9a4a-20c1082b8fc0',
    avatar: 'https://randomuser.me/api/portraits/women/57.jpg',
    name: 'Luiza Santos',
    email: 'luiza.santos@example.com',
  },
  {
    id: '687f54f8-c77e-456a-8a1f-bd47ebf8e386',
    avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
    name: 'Giray Asikoglu',
    email: 'giray.asikoglu@example.com',
  },
  {
    id: '687f54f8-c77e-456a-8a1f-bd47ebf8e386',
    avatar: 'https://randomuser.me/api/portraits/women/58.jpg',
    name: 'Julia Gomes',
    email: 'julia.gomes@example.com',
  },
  {
    id: '6c4e9e57-84f9-4ce4-a689-0e1c46381f28',
    avatar: 'https://randomuser.me/api/portraits/men/59.jpg',
    name: 'Bo Kaland',
    email: 'bo.kaland@example.com',
  },
  {
    id: 'e029b590-6096-4829-adfa-cf24981862ff',
    avatar: 'https://randomuser.me/api/portraits/women/59.jpg',
    name: 'Faustina Alves',
    email: 'faustina.alves@example.com',
  },
  {
    id: '9fa92c2b-1eba-489a-a7e5-ac6840b67500',
    avatar: 'https://randomuser.me/api/portraits/women/60.jpg',
    name: 'Gabriella Krupp',
    email: 'gabriella.krupp@example.com',
  },
  {
    id: 'd8c4dd58-11a5-46d8-915c-43e9db010632',
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
    name: 'Zborislav Chaplichi',
    email: 'zborislav.chaplichi@example.com',
  },
  {
    id: '36b34583-9aee-4581-84e6-b9b45636d841',
    avatar: 'https://randomuser.me/api/portraits/women/61.jpg',
    name: 'Jenny Stanley',
    email: 'jenny.stanley@example.com',
  },
  {
    id: '553bcf00-71b2-4196-bebb-7d05a2bc3403',
    avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
    name: 'Kirk Mason',
    email: 'kirk.mason@example.com',
  },
  {
    id: '2f0bf420-cadc-405a-a566-e290cef2e5d4',
    avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    name: 'Lucas Grewal',
    email: 'lucas.grewal@example.com',
  },
  {
    id: '4ab52f9e-1da4-4a42-bb4e-30ecf506e88c',
    avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
    name: 'Isabela Velásquez',
    email: 'isabela.velasquez@example.com',
  },
  {
    id: 'b6ed586a-24c3-469f-a624-eb975ffc4005',
    avatar: 'https://randomuser.me/api/portraits/men/63.jpg',
    name: 'Dwayne Goedkoop',
    email: 'dwayne.goedkoop@example.com',
  },
  {
    id: 'fcce114f-f679-4e9c-80a6-1a79d0e448f0',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    name: 'Selinay Cleven',
    email: 'selinay.cleven@example.com',
  },
  {
    id: '8e47175e-8982-4d14-976b-4ce30387dda8',
    avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
    name: 'Michon Silva',
    email: 'michon.silva@example.com',
  },
  {
    id: '29babb15-3739-43bf-bcce-a42e86f275b3',
    avatar: 'https://randomuser.me/api/portraits/women/64.jpg',
    name: 'Justina Gruhn',
    email: 'justina.gruhn@example.com',
  },
  {
    id: '79f7c0bd-1332-486f-8c6a-f9c8a6a4b5ae',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    name: 'Yuliy Lisovi',
    email: 'yuliy.lisovi@example.com',
  },
  {
    id: '04840a8a-e06a-4c11-9c19-42666f4098aa',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Gloria Martin',
    email: 'gloria.martin@example.com',
  },
  {
    id: 'aabc80a3-f3df-4908-a65d-dbdae87bad8f',
    avatar: 'https://randomuser.me/api/portraits/men/66.jpg',
    name: 'Jack Wright',
    email: 'jack.wright@example.com',
  },
  {
    id: 'c71e718d-4323-4ecb-a836-161b6480b9b2',
    avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
    name: 'Sandra Ramos',
    email: 'sandra.ramos@example.com',
  },
  {
    id: 'cd67f766-b231-4358-9aa1-70c7cb6293ed',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    name: 'Judith Pulido',
    email: 'judith.pulido@example.com',
  },
  {
    id: '32462819-0d83-45f1-887c-629a6590c66b',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    name: 'Trifun Borjan',
    email: 'trifun.borjan@example.com',
  },
  {
    id: '5c92a38b-e21f-46ba-8533-fdc7a8eb464e',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Vicky Richards',
    email: 'vicky.richards@example.com',
  },
  {
    id: '291c41e8-1bdd-422f-9dae-0f2ec107bbae',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    name: 'Habacuque Oliveira',
    email: 'habacuque.oliveira@example.com',
  },
  {
    id: '5395cf87-63c1-4796-9f82-7bb275b64b88',
    avatar: 'https://randomuser.me/api/portraits/men/69.jpg',
    name: 'Byron Castillo',
    email: 'byron.castillo@example.com',
  },
  {
    id: '3a450244-5b7f-40bc-b157-83946e3ce60c',
    avatar: 'https://randomuser.me/api/portraits/women/69.jpg',
    name: 'Hannah Patel',
    email: 'hannah.patel@example.com',
  },
  {
    id: 'fc6b09d1-905e-468b-bb3a-818b9cc19c3f',
    avatar: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Vinny Pomp',
    email: 'vinny.pomp@example.com',
  },
  {
    id: 'd78a0a92-b323-489e-a46c-53191f65b051',
    avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
    name: 'Maëly Schmitt',
    email: 'maely.schmitt@example.com',
  },
  {
    id: 'b8dc093e-e1e5-493c-947a-8442e36d9bbf',
    avatar: 'https://randomuser.me/api/portraits/men/71.jpg',
    name: 'Dylan Nguyen',
    email: 'dylan.nguyen@example.com',
  },
  {
    id: '3d691a7c-e0ee-4b45-bce4-bdcda35a7a48',
    avatar: 'https://randomuser.me/api/portraits/women/71.jpg',
    name: 'Gonca Küçükler',
    email: 'gonca.kucukler@example.com',
  },
  {
    id: '5fd1161c-da8a-4d55-b353-5233a91c2586',
    avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
    name: 'Akshitha Saldanha',
    email: 'akshitha.saldanha@example.com',
  },
  {
    id: '12e0730e-5f57-4b41-9bf9-ed0773fd2fb4',
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    name: 'Gostrozir Pshenichniy',
    email: 'gostrozir.pshenichniy@example.com',
  },
  {
    id: '5247f1bf-274f-4445-9ced-33815cf29ba9',
    avatar: 'https://randomuser.me/api/portraits/women/73.jpg',
    name: 'رونیکا رضاییان',
    email: 'rwnykh.rdyyn@example.com',
  },
  {
    id: '7945215c-b814-4d03-8dab-1577ed6bfc3c',
    avatar: 'https://randomuser.me/api/portraits/men/73.jpg',
    name: 'Dobroslav Živanović',
    email: 'dobroslav.zivanovic@example.com',
  },
  {
    id: '142b5aab-05e0-4f67-8594-4faf515810ef',
    avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
    name: 'Idário Martins',
    email: 'idario.martins@example.com',
  },
  {
    id: '434a1d3d-2c1a-4925-b667-63118d4866c8',
    avatar: 'https://randomuser.me/api/portraits/women/74.jpg',
    name: 'Natalia Martin',
    email: 'natalia.martin@example.com',
  },
  {
    id: '0fa7c0ba-c3ec-47c0-8aa4-9b50c37469b9',
    avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
    name: 'Agatha Roux',
    email: 'agatha.roux@example.com',
  },
  {
    id: '499e8fc2-f8ba-417e-ad89-335ad697a9ff',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    name: 'Đoka Nađ',
    email: 'doka.nad@example.com',
  },
  {
    id: '0729fdb8-010d-4f79-9eb0-d4d8e935b81c',
    avatar: 'https://randomuser.me/api/portraits/women/76.jpg',
    name: 'Clotildes Carvalho',
    email: 'clotildes.carvalho@example.com',
  },
  {
    id: 'f8ec295f-b217-43ca-a445-3cb4a28baa09',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    name: 'Valtteri Kuusisto',
    email: 'valtteri.kuusisto@example.com',
  },
  {
    id: 'd8561f98-22a3-436e-a638-44e5d128d07e',
    avatar: 'https://randomuser.me/api/portraits/women/77.jpg',
    name: 'Elif Durmaz',
    email: 'elif.durmaz@example.com',
  },
  {
    id: '3e13b88f-72fb-4d48-a0e4-b78faa6351f4',
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
    name: 'Noah Mortensen',
    email: 'noah.mortensen@example.com',
  },
  {
    id: '90f1d30d-2d3e-4989-b175-a5b2381dce58',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    name: 'Vist Skoba',
    email: 'vist.skoba@example.com',
  },
  {
    id: 'f4512645-2881-4032-9a6f-dde7e001c021',
    avatar: 'https://randomuser.me/api/portraits/women/78.jpg',
    name: 'Charel Odink',
    email: 'charel.odink@example.com',
  },
  {
    id: '4daef589-7687-4920-a296-da77882ea142',
    avatar: 'https://randomuser.me/api/portraits/men/79.jpg',
    name: 'Miguel Lozano',
    email: 'miguel.lozano@example.com',
  },
  {
    id: 'b139c178-5141-4089-8c82-3baeb2833a19',
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    name: 'Louise Dupont',
    email: 'louise.dupont@example.com',
  },
  {
    id: '1b0be326-a9c9-4b1d-abae-4cf205b568a3',
    avatar: 'https://randomuser.me/api/portraits/women/80.jpg',
    name: 'Lauren Mcdonalid',
    email: 'lauren.mcdonalid@example.com',
  },
  {
    id: '61bec7be-1c85-4f22-8f26-fdd0c14c7ea7',
    avatar: 'https://randomuser.me/api/portraits/men/80.jpg',
    name: 'Adelbert Kliem',
    email: 'adelbert.kliem@example.com',
  },
  {
    id: 'c936f507-e29c-46cf-a3bc-919867cbbd54',
    avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
    name: 'Cesar Romero',
    email: 'cesar.romero@example.com',
  },
  {
    id: '6e084538-6b20-41ad-8309-625d9f0bb380',
    avatar: 'https://randomuser.me/api/portraits/women/81.jpg',
    name: 'Margarete Fechner',
    email: 'margarete.fechner@example.com',
  },
  {
    id: 'cdde805f-2545-49b6-99ca-86dabbc073a8',
    avatar: 'https://randomuser.me/api/portraits/women/82.jpg',
    name: 'Praneetha Holla',
    email: 'praneetha.holla@example.com',
  },
  {
    id: '3a5219ce-b357-4576-84f7-fffebcd0bc7b',
    avatar: 'https://randomuser.me/api/portraits/men/82.jpg',
    name: 'Frederik Christensen',
    email: 'frederik.christensen@example.com',
  },
  {
    id: 'f0cf2844-f444-4d75-9bf6-edd1d1da52ca',
    avatar: 'https://randomuser.me/api/portraits/men/83.jpg',
    name: 'Syver Eilertsen',
    email: 'syver.eilertsen@example.com',
  },
  {
    id: '136faba4-da45-460c-ac32-534709b2ec91',
    avatar: 'https://randomuser.me/api/portraits/women/83.jpg',
    name: 'Sofia Jones',
    email: 'sofia.jones@example.com',
  },
  {
    id: 'd109d6f2-b011-4abc-a691-c694991b5fea',
    avatar: 'https://randomuser.me/api/portraits/men/84.jpg',
    name: 'رهام رضایی',
    email: 'rhm.rdyy@example.com',
  },
  {
    id: 'e3453559-952e-4aa8-b7d6-6d7bd785fa7e',
    avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
    name: 'Mar Ferrer',
    email: 'mar.ferrer@example.com',
  },
  {
    id: 'aaa655ae-93e5-452e-b60e-447dd2c41f85',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    name: 'Deniz Bugten',
    email: 'deniz.bugten@example.com',
  },
  {
    id: 'aaa655ae-93e5-452e-b60e-447dd2c41f89',
    avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
    name: 'Beatriz Bugten',
    email: 'Beatriz.bugten@example.com',
  },
  {
    id: 'c66294bd-5fe3-4912-9d15-a75db9638b79',
    avatar: 'https://randomuser.me/api/portraits/women/86.jpg',
    name: 'Charèl Stam',
    email: 'charel.stam@example.com',
  },
  {
    id: 'a23a0650-8059-400e-8dd6-571faea0a311',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    name: 'Miladin Stojaković',
    email: 'miladin.stojakovic@example.com',
  },
  {
    id: '45653aa3-012a-400a-a8a5-adcd21063399',
    avatar: 'https://randomuser.me/api/portraits/women/87.jpg',
    name: 'Cristina Adam',
    email: 'cristina.adam@example.com',
  },
  {
    id: '73b2a11c-54f8-47e5-8508-9526bb561ab4',
    avatar: 'https://randomuser.me/api/portraits/men/87.jpg',
    name: 'Viljami Lehto',
    email: 'viljami.lehto@example.com',
  },
  {
    id: 'f6a48195-e430-45bb-9cf0-13b36e4b1c06',
    avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
    name: 'Klaus Bourgeois',
    email: 'klaus.bourgeois@example.com',
  },
  {
    id: '851ab8c1-1ebc-4d13-9bb0-ab3f9144ca2d',
    avatar: 'https://randomuser.me/api/portraits/women/88.jpg',
    name: 'Laila Van Aarle',
    email: 'laila.vanaarle@example.com',
  },
  {
    id: 'f187e88e-7651-409e-9112-25ba0af40d65',
    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    name: 'Marie-Theres Redlich',
    email: 'marie-theres.redlich@example.com',
  },
  {
    id: '02781341-10f3-4ea2-a4ab-20aa519236c2',
    avatar: 'https://randomuser.me/api/portraits/men/89.jpg',
    name: 'Reynaldo Mireles',
    email: 'reynaldo.mireles@example.com',
  },
  {
    id: '1468d672-90b3-4fa2-8bc0-b03f89dfc89c',
    avatar: 'https://randomuser.me/api/portraits/men/90.jpg',
    name: 'Luukas Manninen',
    email: 'luukas.manninen@example.com',
  },
  {
    id: 'a64817fa-0472-4d8c-8a18-1e917ee75f01',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    name: 'Aada Maunu',
    email: 'aada.maunu@example.com',
  },
  {
    id: '88a3c776-375c-4a18-8433-24d3c301eab7',
    avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    name: 'Archer Chen',
    email: 'archer.chen@example.com',
  },
  {
    id: '1cd4fd2d-5f14-499a-bb5b-35ca668b7393',
    avatar: 'https://randomuser.me/api/portraits/women/91.jpg',
    name: 'Katie Fitzgerald',
    email: 'katie.fitzgerald@example.com',
  },
  {
    id: '8c78494f-648b-4f11-b516-6a82bad79519',
    avatar: 'https://randomuser.me/api/portraits/women/92.jpg',
    name: 'Marie Peterson',
    email: 'marie.peterson@example.com',
  },
  {
    id: 'cdcbb69a-805b-4b7c-969c-f242790d7c4c',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    name: 'Hans Jörg Hopf',
    email: 'hansjorg.hopf@example.com',
  },
  {
    id: 'd3957e52-9aa2-418b-852a-1320a59957f2',
    avatar: 'https://randomuser.me/api/portraits/men/93.jpg',
    name: 'امیر گلشن',
    email: 'myr.glshn@example.com',
  },
  {
    id: 'f649e90e-4082-45f6-b0a5-6696c464461a',
    avatar: 'https://randomuser.me/api/portraits/women/93.jpg',
    name: 'Diana Coleman',
    email: 'diana.coleman@example.com',
  },
  {
    id: '7b2e42ab-ebef-4bb0-aa8a-a1a882714fd2',
    avatar: 'https://randomuser.me/api/portraits/men/94.jpg',
    name: 'Živojin Filipović',
    email: 'zivojin.filipovic@example.com',
  },
  {
    id: 'a08aa049-f25a-472c-b3c1-08f68deb0a4e',
    avatar: 'https://randomuser.me/api/portraits/women/94.jpg',
    name: 'Loredana Carpentier',
    email: 'loredana.carpentier@example.com',
  },
  {
    id: 'db8ef28f-c1fd-4bff-b5af-d33cf1face2c',
    avatar: 'https://randomuser.me/api/portraits/men/95.jpg',
    name: 'Vlatko Hadžić',
    email: 'vlatko.hadzic@example.com',
  },
  {
    id: 'd569ab61-d2c5-411f-af53-0dda71db9121',
    avatar: 'https://randomuser.me/api/portraits/women/95.jpg',
    name: 'Charlie Claire',
    email: 'charlie.claire@example.com',
  },
  {
    id: '4577e650-406a-4473-8a07-750669e8e9d4',
    avatar: 'https://randomuser.me/api/portraits/women/96.jpg',
    name: 'Amelia Wood',
    email: 'amelia.wood@example.com',
  },
  {
    id: '9bcb80fc-c2ac-4a78-af59-80ecc52a4ab9',
    avatar: 'https://randomuser.me/api/portraits/men/96.jpg',
    name: 'Heinz-Dieter Rieck',
    email: 'heinz-dieter.rieck@example.com',
  },
  {
    id: 'a8bdfff9-5e6c-4796-8bd0-1349e92667c6',
    avatar: 'https://randomuser.me/api/portraits/men/97.jpg',
    name: 'Bob Stephens',
    email: 'bob.stephens@example.com',
  },
  {
    id: 'a8bdfff9-5e6c-4796-8bd0-1349e92667c9',
    avatar: 'https://randomuser.me/api/portraits/women/97.jpg',
    name: 'Silmara Stephens',
    email: 'Silmara.stephens@example.com',
  },
  {
    id: '1b857f30-5a4c-42b1-9120-26e3b8bd2874',
    avatar: 'https://randomuser.me/api/portraits/women/98.jpg',
    name: 'Luna Moreira',
    email: 'luna.moreira@example.com',
  },
  {
    id: '1b857f30-5a4c-42b1-9120-26e3b8bd2874',
    avatar: 'https://randomuser.me/api/portraits/men/98.jpg',
    name: 'Caio Moreira',
    email: 'caio.moreira@example.com',
  },
  {
    id: '97fd5266-73de-4d08-aeb3-7c127347001d',
    avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
    name: 'Austin Clark',
    email: 'austin.clark@example.com',
  },
  {
    id: '97fd5266-73de-4d08-aeb3-7c127347001d',
    avatar: 'https://randomuser.me/api/portraits/women/99.jpg',
    name: 'Amanda Clark',
    email: 'amanda.clark@example.com',
  },
]

type IUser = {
  id: string
  avatar: string
  name: string
  email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const name = (req.query.name as string) ?? ''
    const users = await getUsers(name)
    return res.status(200).json(users)
  }

  res.status(405).json({ message: 'Method not allowed' })
}

const getUsers = async (name: string): Promise<IUser[]> => {
  const searchName = name.toLowerCase()
  const results = USERS

  const filterUsersBySearchName = (users: IUser[], searchName: string) => {
    if (!searchName) return users

    const filteredUsers = users.filter((user: Record<string, any>) => {
      return user.name.toLowerCase().includes(searchName)
    })

    return filteredUsers
  }
  const sortUsersBySearchName = (users: IUser[], searchName: string) => {
    if (!searchName) return users

    const orderedUsers = users.sort(({ name: nameA }, { name: nameB }) => {
      const indexOfA = nameA.toLowerCase().indexOf(searchName)
      const indexOfB = nameB.toLowerCase().indexOf(searchName)

      return indexOfA - indexOfB || nameA.localeCompare(nameB)
    })

    return orderedUsers
  }

  const filteredUsers = filterUsersBySearchName(results, searchName)
  const orderedUsers = sortUsersBySearchName(filteredUsers, searchName)

  return orderedUsers
}
