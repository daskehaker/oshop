import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnDestroy {
id: string;
order: any = {shipping: {}, items: [{product: {}}]};
subscription: Subscription
  constructor(private route: ActivatedRoute, private ordersService: OrderService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.ordersService.getOrderById(this.id).subscribe(res => {this.order = res;});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
