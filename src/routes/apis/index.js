import express from 'express';
import multer from 'multer';
import os from 'os';
import { API_ROUTES } from '..';
import BankController from '../../controllers/bank-controller';
import CategoryController from '../../controllers/category-controller';
import NominalController from '../../controllers/nominal-controller';
import PaymentController from '../../controllers/payment-controller';
import TransactionController from '../../controllers/transaction-controller';
import UserController from '../../controllers/user-controller';
import VoucherController from '../../controllers/voucher-controller';
import PlayerController from '../../controllers/player-controller';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.post(API_ROUTES.CREATE_CATEGORY, CategoryController.createCategory);
router.get(API_ROUTES.GET_CATEGORIES, CategoryController.getCategories);
router.get(API_ROUTES.GET_CATEGORY_BY_ID, CategoryController.getCategoryById);
router.put(API_ROUTES.UPDATE_CATEGORY, CategoryController.updateCategory);
router.delete(API_ROUTES.DELETE_CATEGORY, CategoryController.deleteCategory);

router.post(API_ROUTES.CREATE_NOMINAL, NominalController.createNominal);
router.get(API_ROUTES.GET_NOMINALS, NominalController.GetAllNominal);
router.put(API_ROUTES.UPDATE_NOMINAL, NominalController.updateNominal);
router.delete(API_ROUTES.DELETE_NOMINAL, NominalController.deleteNominal);

router.post(API_ROUTES.CREATE_VOUCHER, multer({ dest: os.tmpdir() }).single('image'), VoucherController.createVoucher);
router.get(API_ROUTES.GET_VOUCHER, VoucherController.getAllData);
router.get(API_ROUTES.GET_VOUCHER_BY_ID, VoucherController.getDataById);
router.put(API_ROUTES.UPDATE_VOUCHER, multer({ dest: os.tmpdir() }).single('image'), VoucherController.updateVoucher);
router.delete(API_ROUTES.DELETE_VOUCHER, VoucherController.deleteVoucher);
router.put(API_ROUTES.UPDATE_STATUS_VOUCHER, VoucherController.updateStatusVoucher);

router.post(API_ROUTES.CREATE_BANK, BankController.actionCreate);
router.put(API_ROUTES.UPDATE_BANK, BankController.actionUpdate);
router.delete(API_ROUTES.DELETE_BANK, BankController.actionDelete);

router.post(API_ROUTES.CREATE_PAYMENT, PaymentController.createPayment);
router.put(API_ROUTES.UPDATE_PAYMENT, PaymentController.updatePayment);
router.put(API_ROUTES.UPDATE_STATUS_PAYMENT, PaymentController.updateStatusPayment);
router.delete(API_ROUTES.DELETE_PAYMENT, PaymentController.deletePayment);

router.put(API_ROUTES.UPDATE_STATUS_TRANSACTION, TransactionController.updateStatus);

router.post(API_ROUTES.LOGIN_ADMIN, UserController.login);
router.get(API_ROUTES.LOGOUT, UserController.logout);

router.get(API_ROUTES.LANDING_PAGE, PlayerController.landingPage);
router.get(API_ROUTES.DETAIL_PAGE, PlayerController.detailPage);
router.post(API_ROUTES.REGISTER, multer({ dest: os.tmpdir() }).single('image'), PlayerController.register);
router.get(API_ROUTES.CATEGORY, PlayerController.getCategories);
router.post(API_ROUTES.LOGIN, PlayerController.login);
router.post(API_ROUTES.CHECKOUT, [Auth.isLoginPlayer], PlayerController.checkout);
router.get(API_ROUTES.HISTORY, [Auth.isLoginPlayer], PlayerController.history);
router.get(API_ROUTES.TRANSACTION_DETAIL, [Auth.isLoginPlayer], PlayerController.historyDetail);
router.get(API_ROUTES.DASHBOARD, [Auth.isLoginPlayer], PlayerController.dashboard);
router.get(API_ROUTES.GET_PROFILE, [Auth.isLoginPlayer], PlayerController.getProfile);

export default router;
