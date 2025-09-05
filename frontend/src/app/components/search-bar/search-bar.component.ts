import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../_services/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent{

  routerService = inject(Router);
  searchService = inject(SearchService);

  searchText!: string | undefined;

  constructor(){
    effect(() => {
      this.searchText = this.searchService?.name();
    });
  }
  
  onSubmit(){
    const params: Record<string, string> = {
      size: String(this.searchService.size()),
      page: String(this.searchService.page()),
    };
    
    const text = this.searchText?.trim();
    if(text && text.length > 0){
      params['name'] = text;
      //update del valore nel search service per condividerlo
      this.searchService.setName(text);
    } else this.searchService.setName(undefined); //reset del name nel serchService
    
    this.searchService.setSearchActive();
    this.routerService.navigate(['/restaurants'], {queryParams: params});
  }
}
