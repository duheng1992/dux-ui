import Modal from './Modal';
export default Modal;

import Content from './Content';
(Modal as any).Content = Content;

import * as method from './method';

Object.assign(Modal, method);
