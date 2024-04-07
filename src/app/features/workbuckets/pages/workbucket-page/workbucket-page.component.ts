import { Component, inject } from '@angular/core';
import { WorkbucketSelectComponent } from './components/workbucket-select/workbucket-select.component';
import { Router } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';

@Component({
  selector: 'app-workbucket-page',
  standalone: true,
  imports: [WorkbucketSelectComponent],
  templateUrl: './workbucket-page.component.html',
  styleUrl: './workbucket-page.component.scss',
})
export class WorkbucketPageComponent {

  router = inject(Router);
  name = injectParams('id');

  sampleBuckets = [
    'Print Modernization',
    'eSignature Rewrite',
    'DevOps Initiative',
    'Angular User Group',
    'Resource Management'
  ]

  onBucketSelected(bucket: string) {
    this.router.navigate(['/workbucket', bucket])
  }

}
