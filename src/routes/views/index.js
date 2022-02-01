import express from 'express';
import { VIEW_ROUTES } from '..';
import AdminController from '../../controllers/admin-controller';
import BankController from '../../controllers/bank-controller';
import CategoryController from '../../controllers/category-controller';
import NominalController from '../../controllers/nominal-controller';
import PaymentController from '../../controllers/payment-controller';
import TransactionController from '../../controllers/transaction-controller';
import UserController from '../../controllers/user-controller';
import VoucherController from '../../controllers/voucher-controller';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.get(VIEW_ROUTES.LOGIN, [Auth.isLoginAdmin], UserController.loginView);

router.get(VIEW_ROUTES.DASHBOARD, AdminController.dashboardView);

router.get(VIEW_ROUTES.CATEGORY, [Auth.isLoginAdmin], CategoryController.categoryView);
router.get(VIEW_ROUTES.CREATE_CATEGORY, [Auth.isLoginAdmin], CategoryController.formCreateCategoryView);
router.get(VIEW_ROUTES.UPDATE_CATEGORY, [Auth.isLoginAdmin], CategoryController.formUpdateCategoryView);
router.get(VIEW_ROUTES.UPDATE_CATEGORY, [Auth.isLoginAdmin], CategoryController.updateCategory);

router.get(VIEW_ROUTES.NOMINAL, [Auth.isLoginAdmin], NominalController.GetAllNominal);
router.get(VIEW_ROUTES.CREATE_NOMINAL, [Auth.isLoginAdmin], NominalController.formCreateNominalView);
router.get(VIEW_ROUTES.UPDATE_NOMINAL, [Auth.isLoginAdmin], NominalController.formUpdateNominal);
router.get(VIEW_ROUTES.UPDATE_NOMINAL, [Auth.isLoginAdmin], NominalController.updateNominal);

router.get(VIEW_ROUTES.VOUCHER, [Auth.isLoginAdmin], VoucherController.viewVoucher);
router.get(VIEW_ROUTES.CREATE_VOUCHER, [Auth.isLoginAdmin], VoucherController.formCreateVoucher);
router.get(VIEW_ROUTES.UPDATE_VOUCHER, [Auth.isLoginAdmin], VoucherController.formEditVoucher);

router.get(VIEW_ROUTES.BANK, [Auth.isLoginAdmin], BankController.viewBank);
router.get(VIEW_ROUTES.CREATE_BANK, [Auth.isLoginAdmin], BankController.formCreate);
router.get(VIEW_ROUTES.UPDATE_BANK, [Auth.isLoginAdmin], BankController.formUpdate);

router.get(VIEW_ROUTES.PAYMENT, [Auth.isLoginAdmin], PaymentController.viewPayment);
router.get(VIEW_ROUTES.CREATE_PAYMENT, [Auth.isLoginAdmin], PaymentController.formCreatePayment);
router.get(VIEW_ROUTES.UPDATE_PAYMENT, [Auth.isLoginAdmin], PaymentController.formUpdatePayment);

router.get(VIEW_ROUTES.TRANSACTION, [Auth.isLoginAdmin], TransactionController.viewTransaction);

export default router;
