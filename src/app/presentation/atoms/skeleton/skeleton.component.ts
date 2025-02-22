import {Component, input} from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
  standalone: true,
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {

  width = input<string>('100%');
  height = input<string>('20px');

}
