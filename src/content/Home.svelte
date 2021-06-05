<script>
  import { onMount } from 'svelte'
  import Welcome from '../components/Welcome.svelte'
  import LifeSection from '../components/LifeSection.svelte'
  import ProjectSection from '../components/projectSection.svelte';
  import mongoIcon from '../resources/images/mongo.png'
  import css3Icon from '../resources/images/css3Icon.png'

  let a = 1.5
  onMount(() => {
    const fadeBackground = setInterval(() => {
      if (a > 0.3) a -= 0.02
    }, 100);
    setTimeout(() => {
      clearInterval(fadeBackground)
    }, 10000);
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
    }
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
      }
    },
    {
      title: 'Kuw',
      year: 2018,
      techs: [ techs[0], techs[1], techs[2], techs[4] ],
      desc: 'Scholar project, focus on boost independent street and cultural art.',
      roles: ['Principal frontend developer'],
      git: {
        text: 'Private on GitLab',
      }
    },
    {
      title: 'Contec Industrial Web page',
      year: 2018,
      techs: [ techs[0], techs[5], techs[6], techs[3] ],
      desc: 'An old version web page for Contec Industrial',
      roles: ['Started as Junior frontend developer', 'Finished as Principal frontend developer'],
      git: {
        text: 'Private on GitLab',
      }
    },
    {
      title: 'CSS Only Draw',
      year: 2021,
      techs: [ techs[7] ],
      desc: 'An old version web page for Contec Industrial',
      roles: ['Started as Junior frontend developer', 'Finished as Principal frontend developer'],
      git: {
        text: 'Private on GitLab',
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
    text="I won a scholarship"
    content={`from the FJBG, to carry out my studies in 
    Computer Science Engineering at the 
    University of the Valley of Guatemala.`}
    side="left"
  />
  <ProjectSection project={projects[3]} side="left" />
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
