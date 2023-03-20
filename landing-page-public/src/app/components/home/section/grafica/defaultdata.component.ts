const colorscheme1 = [
  'rgba(204, 36, 29 , 1)',
  'rgba(254, 128, 25, 1)',
  'rgba(250, 189, 47, 1)',
  'rgba(235, 219, 178,1)',
  'rgba(184, 187, 38, 1)',
  'rgba(152, 151, 26, 1)',
];

const colorscheme2 = [
  'rgba(254, 128, 25, 1)',
  'rgba(250, 189, 47, 1)',
  'rgba(184, 187, 38, 1)',
];

const graph_colors = [
  {
    backgroundColor: colorscheme1,
  },
  { backgroundColor: 'rgba(254, 128, 25, 1)' },
  { backgroundColor: 'rgba(250, 189, 47, 1)' },
  { backgroundColor: 'rgba(235, 219, 178, 1)' },
  { backgroundColor: 'rgba(184, 187, 38, 1)' },
  { backgroundColor: 'rgba(152, 151, 26, 1)' },
];

const default_data_graph = [
  {
    data: [330, 600, 260, 700],
    label: ['Negativo '],
    backgroundColor: [colorscheme2[0]],
  },
  {
    data: [250, 455, 100, 340],
    label: ['Neutral'],
    backgroundColor: [colorscheme2[1]],
  },
  {
    data: [170, 455, 100, 340],
    label: ['Positivo'],
    backgroundColor: [colorscheme2[2]],
  },
];


export{ colorscheme1,colorscheme2,graph_colors,default_data_graph};
