import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

@Input() product: Product = {
  id: 0,
  handle: '',
  title: '',
  description: '',
  SKU: '',
  grams: 0,
  stock: 0,
  price: 0,
  comparePrice: 0,
  barcode: '',
  category: '',
  image: '',
  rating: 0,
};


  @Output() confirm = new EventEmitter<Product>();

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

productForm = this.formBuilder.group({
  id: [0],
  handle: ['', Validators.required],
  title: ['', Validators.required],
  description: ['', Validators.required],
  SKU: ['', Validators.required],
  grams: [0, Validators.required],
  stock: [0, Validators.required],
  price: [0, Validators.required],
  comparePrice: [0, Validators.required],
  barcode: ['', Validators.required],
  category: ['', Validators.required],
  image: [''],
  rating: [0],
});


  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    const { id, handle, title, image, price, rating, description, grams, stock, SKU, category, comparePrice, barcode } = this.productForm.value;

this.confirm.emit({
  id: id || 0,
  handle: handle || '',
  title: title || '',
  description: description || '',
  SKU: SKU || '',
  grams: grams || 0,
  stock: stock || 0,
  price: price || 0,
  comparePrice: comparePrice || 0,
  barcode: barcode || '',
  category: category || '',
  image: image || '',
  rating: rating || 0,
});

    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
