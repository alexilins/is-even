import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatCard,
    MatCardContent,
    MatSnackBarModule,
  ],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataFormComponent {
  private readonly snackbar = inject(MatSnackBar);

  public readonly dataForm = inject(FormBuilder).group({
    value: [''],
  });

  public submit(): void {
    const val = this.dataForm.getRawValue().value;

    const res = this.serverValidation(val);

    this.snackbar.open(res.message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: res.type === 'success' ? 'snack-success' : 'snack-error',
    });
  }

  private serverValidation(val?: string | null): {
    type: 'success' | 'error';
    message: string;
  } {
    if (!val || !val.trim()) {
      return {
        type: 'error',
        message: 'Введите не пустое значение',
      };
    }

    const v = val.trim();

    console.log({ v });

    if (isNaN(parseInt(v))) {
      return {
        type: 'error',
        message: 'Введите число',
      };
    }

    if (!Number.isInteger(+v)) {
      return {
        type: 'error',
        message: 'Введите целое число',
      };
    }

    const remainer = parseInt(v) % 2;

    if (remainer) {
      return {
        type: 'success',
        message: 'Это не четное число',
      };
    } else {
      return {
        type: 'success',
        message: 'Это четное число',
      };
    }
  }
}
