package carbook.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import carbook.config.PaypalPaymentIntent;
import carbook.config.PaypalPaymentMethod;
import carbook.config.Utils;
import carbook.service.PaypalServices;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/paypal")
public class Paypalcontroller {

	/*
	 * public static final String URL_PAYPAL_SUCCESS =
	 * "/api/paypal/pay/success?email="; public static final String
	 * URL_PAYPAL_CANCEL = "/api/paypal/pay/cancel";
	 * 
	 * @Autowired private PaypalServices paypalService;
	 * 
	 * 
	 * @RequestMapping(value ="/pay", method = RequestMethod.POST) public String
	 * pay(HttpServletRequest request,@RequestParam("price") double price,
	 * 
	 * @RequestParam("email") String email){ String cancelUrl =
	 * Utils.getBaseURL(request) + URL_PAYPAL_CANCEL; String successUrl =
	 * Utils.getBaseURL(request) + URL_PAYPAL_SUCCESS+email; try { Payment payment =
	 * paypalService.createPayment( price, "USD", PaypalPaymentMethod.paypal,
	 * PaypalPaymentIntent.sale, "payment description", cancelUrl, successUrl);
	 * for(Links links : payment.getLinks()){
	 * if(links.getRel().equals("approval_url")){ return "redirect:/" +
	 * links.getHref(); } } } catch (PayPalRESTException e) {
	 * 
	 * } return "redirect:/"; }
	 * 
	 * @RequestMapping(value ="/pay/cancel", method = RequestMethod.GET) public
	 * String cancelPay(){ return "cancel"; }
	 * 
	 * @RequestMapping(value ="/pay/success", method = RequestMethod.GET) public
	 * String successPay(
	 * 
	 * @RequestParam("paymentId") String paymentId,
	 * 
	 * @RequestParam("PayerID") String payerId,
	 * 
	 * @RequestParam("email") String email){ try { Payment payment =
	 * paypalService.executePayment(paymentId, payerId);
	 * if(payment.getState().equals("approved")){ System.out.print(email); return
	 * "success"; } } catch (PayPalRESTException e) {
	 * 
	 * } return "redirect:/"; }
	 */
}
