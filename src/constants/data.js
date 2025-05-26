import images from './images';
import alf from '../assets/alf.jpg'
import alfin from '../assets/alfin.jpeg'
import tirs from '../assets/tirs.jpg'

const Menu = [{
        text: 'Service',
        link: 'https://github.com/alfset/Validator-tools',
    },
    {
        text: 'Staking',
        link: 'staking',
    },
    {
        text: 'Transfer IBC',
        link: 'transfer',
    },
    {
        text: 'Oracle DAO',
        link: 'https://oracle.dao.comunitynode.my.id/#/',
    },
    {
        text: 'Docs',
        link: 'https://comunity-node.gitbook.io/validator-tools',
    },
    {
        text: 'Co Finance',
        link: 'https://cofinance.comunitynode.my.id',
    },

];
const ServicesData = [
  // Validator Service
  {
    id: 'security',
    titleone: 'Top-Tier Security',
    titletwo: 'Validator Node',
    link: '#security',
    itemclass: 'blight',
    imgURL: images.services01,
    description:
      'Secure your blockchain with our top-tier Validator Node service. Featuring advanced encryption, continuous monitoring, and robust defense mechanisms, we ensure your network’s integrity and reliability, setting a new standard for blockchain security.',
  },
  // Ecosystem & Community Growth
  {
    id: 'ecosystem',
    titleone: 'Ecosystem Growth',
    titletwo: 'Community & Innovation',
    link: '#ecosystem',
    itemclass: 'bgreen',
    imgURL: images.services02,
    description:
      'Catalyze your blockchain ecosystem with our growth services. We attract developers, users, and investors through innovative strategies, fostering collaboration and driving adoption to make your network a leader in the digital space.',
  },
  // Web3 App Development
  {
    id: 'web3-development',
    titleone: 'Web3 Application',
    titletwo: 'Custom Blockchain Solutions',
    link: '#web3-development',
    itemclass: 'bdark',
    imgURL: images.services07, // add suitable image in your assets
    description:
      'Design and develop cutting-edge Web3 decentralized applications tailored to your needs. From smart contracts to user-friendly DApps, we bring innovation and real-world utility to blockchain technology.',
  },
  // Research & Product Innovation
  {
    id: 'blockchain-research',
    titleone: 'Blockchain Research',
    titletwo: 'Product Innovation',
    link: '#blockchain-research',
    itemclass: 'blight',
    imgURL: images.services08,
    description:
      'Pioneering new frontiers in blockchain technology through continuous research and development. We focus on creating scalable, secure, and efficient blockchain products that drive the future of decentralized systems.',
  },
  // Restaking & Rewards
  {
    id: 'restaking',
    titleone: 'Support Restaking',
    titletwo: 'Maximize Rewards',
    link: '#restaking',
    itemclass: 'blight',
    imgURL: images.services04,
    description:
      'Amplify your earnings with our automated restaking solution. Simplify reward reinvestment, enhance security, and unlock exponential growth potential, making your blockchain investments work harder and smarter.',
  },
  // Transparency & Accountability
  {
    id: 'transparency',
    titleone: 'Transparent Operations',
    titletwo: 'Trust & Accountability',
    link: '#transparency',
    itemclass: 'bgreen',
    imgURL: images.services05,
    description:
      'Experience blockchain with unmatched transparency. Our solutions provide verifiable transactions and operations, fostering trust and accountability to empower stakeholders with confidence in your network.',
  },
  // Competitive Fees
  {
    id: 'fees',
    titleone: 'Competitive Fees',
    titletwo: '7% Staking Fees',
    link: '#fees',
    itemclass: 'bdark',
    imgURL: images.services06,
    description:
      'Maximize profits with our low 7% staking fees. Our service combines fair pricing, cutting-edge technology, and robust support to optimize your returns without compromising security or performance.',
  },
];


const CaseStudies = [
  {
    text: 'One of the primary challenges Comunity Node faced was ensuring the security of its validation node, preventing malicious activities that could compromise uptime and staked asset safety.',
  },
  {
    text: 'Maintaining a high uptime was crucial for Comunity Node to remain in good standing within the blockchain network. Any downtime could result in penalties and loss of rewards.',
  },
  {
    text: 'Building trust with delegators was another challenge. Comunity Node proved its reliability and commitment to the POS ecosystem to attract and retain delegators.',
  },
  {
    text: 'Developing decentralized applications for Planq Foundation involved overcoming scalability and usability challenges to create user-friendly Web3 experiences.',
  },
  {
    text: 'Research efforts led by Alfino Setiawana contributed to innovative blockchain protocols and improved interoperability solutions within the ecosystem.',
  },
];


const WorkingProcess = [
  {
    title: 'Our Recent Web3 Development',
    description:
      'Built and managed decentralized exchanges and other Web3 apps on Planq Foundation, pushing ecosystem growth with strong community backing.',
  },
  {
    title: 'Snapshot Provider',
    description:
      'Providing reliable snapshot services to facilitate governance and historical data access for validators, developers, and users.',
  },
  {
    title: 'Educational Guides',
    description:
      'Creating comprehensive guides to help developers and users set up and interact with blockchain nodes smoothly and securely.',
  },
  {
    title: 'IBC and Bridge Operations',
    description:
      'Specializing in Inter-Blockchain Communication and bridge services to enable seamless cross-chain integration and interoperability.',
  },
  {
    title: 'Continual Improvement',
    description:
      'Driving ongoing enhancements across products and services through incremental innovation and breakthrough developments.',
  },
  {
    title: 'Research and Development',
    description:
      'Leading efforts in blockchain protocol innovation and ecosystem expansion strategies to push technological boundaries.',
  },
  {
    title: 'Community and Validator Support',
    description:
      'Spearheading validator maintenance, community building, and educational outreach to empower users and developers.',
  },
];



const Team = [{
    name: 'Alfino Setiawan',
    position: '',
    info: '3+ years of experience as a Node operator, specializing in System Security and leading DApp development.',
    linkedin: 'https://www.linkedin.com/in/alfinosetiawan/',
    image: alf,
},
{
    name: 'Alfin Sugestian',
    position: '',
    info: '3+ years of experience in implementing and managing front-end blockchain-based solutions.',
    linkedin: 'https://www.linkedin.com/in/alfin-sugestian/',
    image: alfin,
},
{
    name: 'Tutut Indah',
    position: '',
    info: '3+ years of experience in project management and team leadership, with strong Design present and social media handler.',
    linkedin: 'https://www.linkedin.com/in/tutut-indah-9a6132119/',
    image: tirs,
},
];


const DApps = [{
        name: 'Multichain Oracle DAO',
        description: 'DAO that control Offchain to onchain',
        imageUrl: 'https://www.physica.finance/logo.png',
        link: 'https://oracle.dao.comunitynode.my.id/#/',
    },
    {
        name: 'Physica Finance',
        description: 'Decentral Exchange On Planq Network',
        imageUrl: 'https://www.physica.finance/logo.png',
        link: 'https://www.physica.finance',
    },
    {
        name: 'Mobile Wallet',
        description: 'Blockchain on your pocket',
        imageUrl: 'https://www.physica.finance/logo.png',
        link: 'https://www.physica.finance'
    },
    {
        name: 'Cardano Hub Indonesia',
        description: 'Quest Homer build on Cardano',
        imageUrl: 'https://surabaya-blockchain-alliance-sand.vercel.app/img/logo.png',
        link: 'https://surabaya-blockchain-alliance-sand.vercel.app/'
    },
    {
        name: 'CoFinance',
        description: 'OneStop DeFi Service',
        imageUrl: 'https://s3.amazonaws.com/keybase_processed_uploads/6529e729081d586e71e4fa64fac33c05_360_360.jpg',
        link: 'https://www.cofinance.comunitynode.my.id'
    },
    {
        name: 'NPM Library',
        description: 'library that we building',
        imageUrl: 'https://s3.amazonaws.com/keybase_processed_uploads/6529e729081d586e71e4fa64fac33c05_360_360.jpg',
        link: 'https://www.npmjs.com/package/tools-comunitynode'
    },
    {
        name: 'Validator Zone',
        description: 'maps of Validator in Cosmos and tendermint ecosystem',
        imageUrl: 'https://s3.amazonaws.com/keybase_processed_uploads/6529e729081d586e71e4fa64fac33c05_360_360.jpg',
        link: 'https://validator.zone.comunitynode.my.id'
    },
];

export default {
    Menu,
    CaseStudies,
    WorkingProcess,
    Team,
    ServicesData,
    DApps
};
