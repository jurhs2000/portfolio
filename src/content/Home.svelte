<script>
  import { onMount } from 'svelte'
  import Welcome from '../components/Welcome.svelte'
  import LifeSection from '../components/LifeSection.svelte'
  import ProjectSection from '../components/projectSection.svelte';
  import mongoIcon from '../resources/images/mongo.png'
  import css3Icon from '../resources/images/css3Icon.png'
  import reactIcon from '../resources/images/react.png'
  import webpackIcon from '../resources/images/webpack.png'
  import babelIcon from '../resources/images/babel.png'
  import postcssIcon from '../resources/images/postcss.png'
  import extIcon from '../resources/images/extension.png'
  import svelteIcon from '../resources/images/svelte.png'
  import cssOnly from '../resources/projects-images/cssOnly.jpg'
  import extension1 from '../resources/projects-images/extension1.jpg'
  import extension2 from '../resources/projects-images/extension2.jpg'
  import extension3 from '../resources/projects-images/extension3.jpg'
  import honda1 from '../resources/projects-images/honda1.jpg'
  import honda2 from '../resources/projects-images/honda2.jpg'
  import kuw from '../resources/projects-images/kuw.jpeg'
  import kuwCollage from '../resources/projects-images/kuw-collage.jpg'
  import contecLogo from '../resources/projects-images/contec-logo.png'
  import spofity1 from '../resources/projects-images/spofity1.jpg'
  import spofity2 from '../resources/projects-images/spofity2.jpg'
  import spofity3 from '../resources/projects-images/spofity3.jpg'
  import spofity4 from '../resources/projects-images/spofity4.jpg'
  import spofity5 from '../resources/projects-images/spofity5.jpg'
  import static1 from '../resources/projects-images/static1.jpg'
  import static2 from '../resources/projects-images/static2.jpg'

  let a = 1.5
  onMount(() => {
    const fadeBackground = setInterval(() => {
      if (a > 0.3) a -= 0.02
    }, 100)
    setTimeout(() => {
      clearInterval(fadeBackground)
    }, 10000)
  })

  const techs = [
    {
      name: 'Node',
      imgSrc: 'https://midu.dev/images/tags/node.png'
    },
    {
      name: 'Angular 5',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/800px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'Express js',
      imgSrc: 'https://camo.githubusercontent.com/438522ac26bb05c47b5a243f914d2dab7c49265b6ee09bbc7df43004f96754f6/68747470733a2f2f6432656970397366336f6f3663322e636c6f756466726f6e742e6e65742f746167732f696d616765732f3030302f3030302f3335392f66756c6c2f657870726573736a736c6f676f2e706e67'
    },
    {
      name: 'MySQL',
      imgSrc: 'https://s3.us-east-1.amazonaws.com/blogueropro-s3-production/blog/qu%C3%A9-es-mysql-y-para-qu%C3%A9-sirve/Qu%C3%A9-es-MySQL-500X500_01.jpg'
    },
    {
      name: 'Mongo',
      imgSrc: mongoIcon
    },
    {
      name: 'Angular 6',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/800px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'Laravel',
      imgSrc: 'https://zwestgroup.com/static/img/stack/laravel.png'
    },
    {
      name: 'CSS',
      imgSrc: css3Icon
    },
    {
      name: 'React',
      imgSrc: reactIcon
    },
    {
      name: 'Webpack',
      imgSrc: webpackIcon
    },
    {
      name: 'Babel',
      imgSrc: babelIcon
    },
    {
      name: 'ESLint',
      imgSrc: 'https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg'
    },
    {
      name: 'PostCSS',
      imgSrc: postcssIcon
    },
    {
      name: 'Chromium',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Chromium_logo.png'
    },
    {
      name: 'Extension',
      imgSrc: extIcon
    },
    {
      name: 'PosrgreSQL',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1024px-Postgresql_elephant.svg.png'
    },
    {
      name: 'Svelte',
      imgSrc: svelteIcon
    },
    {
      name: 'Three JS',
      imgSrc: 'https://aws1.discourse-cdn.com/standard17/uploads/threejs/original/2X/e/e4f86d2200d2d35c30f7b1494e96b9595ebc2751.png'
    },
  ]

  const projects = [
    {
      title: 'Honda demo',
      year: 2017,
      techs: [ techs[0], techs[1], techs[2], techs[3] ],
      desc: 'A web application for scheduling car service appointments at Honda mechanical workshops in Guatemala',
      roles: ['Junior frontend developer', 'Backend support'],
      git: {
        text: 'Only frontend on GitLab',
        link: 'https://gitlab.com/jurhs/HondaApp'
      },
      images: [honda1, honda2]
    },
    {
      title: 'Kuw',
      year: 2018,
      techs: [ techs[0], techs[1], techs[2], techs[4] ],
      desc: 'Scholar project, focus on boost independent street and cultural art.',
      roles: ['Principal frontend developer'],
      git: {
        text: 'Private on GitLab',
      },
      images: [kuw, kuwCollage]
    },
    {
      title: 'Contec Industrial Web page',
      year: 2018,
      techs: [ techs[0], techs[5], techs[6], techs[3] ],
      desc: 'An old version of the web page for Contec Industrial',
      roles: ['Started as Junior frontend developer', 'Finished as Principal frontend developer'],
      git: {
        text: 'Private on GitLab',
      },
      images: [contecLogo]
    },
    {
      title: 'CSS Only Draw',
      year: 2021,
      techs: [ techs[7] ],
      desc: 'A drawing using only css, of the character from the video game Undertale, Sans.',
      roles: ['author'],
      git: {
        text: 'Demo on Codepen',
        link: 'https://codepen.io/jurhs/pen/KKNzEad',
      },
      images: [cssOnly]
    },
    {
      title: 'React Static Page',
      year: 2021,
      techs: [ techs[8], techs[9], techs[10], techs[11], techs[12] ],
      desc: 'A copy of super smash bros ultimate fighters page',
      roles: ['author'],
      git: {
        text: 'Code on Github',
        link: 'https://github.com/jurhs2000/static-page-react',
      },
      images: [static1, static2]
    },
    {
      title: 'Attendance App',
      year: 2021,
      techs: [ techs[13], techs[14] ],
      desc: 'A Chrome Extension',
      roles: ['Co-author'],
      git: {
        text: 'Code on Github',
        link: 'https://github.com/jurhs2000/AttendanceExtension',
      },
      images: [extension1, extension2, extension3]
    },
    {
      title: 'Spofity',
      year: 2021,
      techs: [ techs[0], techs[8], techs[15], techs[2], techs[4] ],
      desc: 'A custom web music app using spotify reproductor',
      roles: ['Co-author'],
      git: {
        text: 'Code on Github',
        link: 'https://github.com/martspain/DataBaseProjectOne'
      },
      images: [spofity1, spofity2, spofity3, spofity4, spofity5]
    },
    {
      title: 'This Portfolio',
      year: 2021,
      techs: [ techs[16], techs[17] ],
      desc: '...',
      roles: ['Author'],
      git: {
        text: 'Code on Github',
        link: 'https://github.com/jurhs2000/portfolio',
      }
    },
  ]
</script>

<main style={`background-color: rgba(0, 0, 0, ${a})`}>
  <Welcome />
  <LifeSection
    text="Since I was younger..."
    content="I like computers, games and art."
  />
  <LifeSection
    text="I started programming"
    content="When I started studying at Kinal"
    side="right"
  />
  <ProjectSection project={projects[0]} side="right" />
  <ProjectSection project={projects[1]} side="right" />
  <ProjectSection project={projects[2]} side="right" />
  <LifeSection
    text="I got a scholarship"
    content={`from the FJBG, to carry out my studies in 
    Computer Science Engineering at the 
    University of the Valley of Guatemala.`}
    side="left"
  />
  <ProjectSection project={projects[3]} side="left" />
  <ProjectSection project={projects[4]} side="left" />
  <ProjectSection project={projects[5]} side="left" />
  <ProjectSection project={projects[6]} side="left" />
  <ProjectSection project={projects[7]} side="left" />
</main>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200&display=swap');

  main {
    width: 100%;
    height: 100%;
    padding-bottom: 100px;
  }

  :global(p) {
    font-family: 'Sarabun', sans-serif;
    color: white;
  }
</style>
