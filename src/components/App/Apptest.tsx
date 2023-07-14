import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '../settings/Modal';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeInnerWidth,
  changeMobileView,
} from '../../store/reducers/window';

function Apptest() {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const mobileView = useAppSelector((state) => state.window.mobileView);
  // Triggered when the window is resized
  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(changeInnerWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleWindowResize);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const innerWidth = useAppSelector((state) => state.window.innerWidth);

  // Check if the inner width of the window is less than 640 pixels
  useEffect(() => {
    if (innerWidth < 640) {
      dispatch(changeMobileView(true));
    } else {
      dispatch(changeMobileView(false));
    }
  }, [innerWidth, dispatch]);

  return (
    <div>
      <Header />
      {/* Render the Modal component if modalIsOpen is true */}
      {modalIsOpen && <Modal />}
      {/* Render the Outlet component if modalIsOpen is false and Mobile is true or Mobile is false */}
      {((!modalIsOpen && mobileView) || !mobileView) && <Outlet />}
      {/* fake div to margin bottom in mobile because footer component is sticky  */}
      <div className="h-16 " />
      <Footer />
    </div>
  );
}

export default Apptest;