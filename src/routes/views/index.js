import express from 'express';
import { VIEW_ROUTES } from '..';
import AdminController from '../../controllers/admin-controller';
import BankController from '../../controllers/bank-controller';
import CategoryController from '../../controllers/category-controller';
import NominalController from '../../controllers/nominal-controller';
import PaymentController from '../../controllers/payment-controller';
import UserController from '../../controllers/user-controller';
import VoucherController from '../../controllers/voucher-controller';
import { isLogin } from '../../middlewares/auth';

const router = express.Router();

router.get(VIEW_ROUTES.DASHBOARD, AdminController.dashboardView);

router.get(VIEW_ROUTES.CATEGORY, [isLogin], CategoryController.categoryView);
router.get(VIEW_ROUTES.CREATE_CATEGORY, [isLogin], CategoryController.formCreateCategoryView);
router.get(VIEW_ROUTES.UPDATE_CATEGORY, [isLogin], CategoryController.formUpdateCategoryView);
router.get(VIEW_ROUTES.UPDATE_CATEGORY, [isLogin], CategoryController.updateCategory);

router.get(VIEW_ROUTES.NOMINAL, [isLogin], NominalController.GetAllNominal);
router.get(VIEW_ROUTES.CREATE_NOMINAL, [isLogin], NominalController.formCreateNominalView);
router.get(VIEW_ROUTES.UPDATE_NOMINAL, [isLogin], NominalController.formUpdateNominal);
router.get(VIEW_ROUTES.UPDATE_NOMINAL, [isLogin], NominalController.updateNominal);

router.get(VIEW_ROUTES.VOUCHER, [isLogin], VoucherController.viewVoucher);
router.get(VIEW_ROUTES.CREATE_VOUCHER, [isLogin], VoucherController.formCreateVoucher);
router.get(VIEW_ROUTES.UPDATE_VOUCHER, [isLogin], VoucherController.formEditVoucher);

router.get(VIEW_ROUTES.BANK, [isLogin], BankController.viewBank);
router.get(VIEW_ROUTES.CREATE_BANK, [isLogin], BankController.formCreate);
router.get(VIEW_ROUTES.UPDATE_BANK, [isLogin], BankController.formUpdate);

router.get(VIEW_ROUTES.PAYMENT, [isLogin], PaymentController.viewPayment);
router.get(VIEW_ROUTES.CREATE_PAYMENT, [isLogin], PaymentController.formCreatePayment);
router.get(VIEW_ROUTES.UPDATE_PAYMENT, [isLogin], PaymentController.formUpdatePayment);

router.get(VIEW_ROUTES.LOGIN, [isLogin], UserController.loginView);

export default router;
