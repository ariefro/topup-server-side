import express from 'express';
import multer from 'multer';
import os from 'os';
import { API_ROUTES } from '..';
import BankController from '../../controllers/bank-controller';
import CategoryController from '../../controllers/category-controller';
import NominalController from '../../controllers/nominal-controller';
import PaymentController from '../../controllers/payment-controller';
import VoucherController from '../../controllers/voucher-controller';

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

export default router;
