import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/user/login';
import Header from './components/common_componets/header';
import Footer from './components/common_componets/footer';
import AreaSearch from './components/top-page/area-search';
import Mv from './components/top-page/mv';
import NewReviews from './components/top-page/new-reviews';
import RaringInfo from './components/top-page/raring-info';
import News from './components/news/news';
import Map from './components/map/map';
import FacilityRegistration from './components/facility/facility_registration';
import FacilityList from './components/facility/facility_list';
import FacilityItem from './components/facility/facility_item';
import 'swiper/swiper-bundle.css';
import ScrollToTop from './components/common_componets/scrolltotop';
import SignUp from './components/user/signup';
import ReviewForm from './components/review/review_form'; 
import MyPage from './components/user/mypage';


export const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/map/:prefecture" element={<MapPage />} />
        <Route path="/facility_registration" element={<NewFacility />} />
        <Route path="/facility_list" element={<Facilitylist />} />
        <Route path="/facility/items/:id" element={<Facilityitem />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/facility/items/:id/review_form"
          element={<ReviewFormPage />}
        />
        <Route path="/mypage" element={<MyPageLayout />} />
       
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const Home = () => (
  <>
    <Header />
    <Mv />
    <AreaSearch />
    <NewReviews />
    <RaringInfo />
    <News />
    <Footer />
  </>
);

const Signup = () => (
  <>
    <Header />
    <SignUp />
    <Footer />
  </>
);

const LoginPage = () => (
  <>
    <Header />
    <Login />
    <Footer />
  </>
);
const MyPageLayout = () => (
  <>
    <Header />
    <MyPage />
    <Footer />
  </>
);

const ReviewFormPage = () => (
  // コンポーネント名を修正
  <>
    <Header />
    <ReviewForm /> {/* 正しいコンポーネントの呼び出し */}
    <Footer />
  </>
);

const Search = () => (
  <>
    <Header />
    <Map />
    <Footer />
  </>
);

const MapPage = () => (
  <>
    <Header />
    <Map />
    <Footer />
  </>
);

const NewFacility = () => (
  <>
    <Header />
    <FacilityRegistration />
    <Footer />
  </>
);

const Facilitylist = () => (
  <>
    <Header />
    <FacilityList />
    <Footer />
  </>
);

const Facilityitem = () => (
  <>
    <Header />
    <FacilityItem />
    <Footer />
  </>
);

const NotFound = () => (
  <>
    <Header />
    <Footer />
  </>
);

export default App;
