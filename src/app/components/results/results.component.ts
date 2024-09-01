import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadService } from '../../_services/upload.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  images: any[] = [];
  videos: any[] = [];
  currentPage = 0;
  pageSize = 12;
  sortImages = 'name,asc';
  sortVideos = 'name,asc';
  totalImages = 0;
  totalVideos = 0;
  sort = 'name,asc';
  loading = true;
  error: string | null = null;
  imageSubscription: Subscription | null = null;
  videoSubscription: Subscription | null = null;
  imageSearchTerm: string = '';
  videoSearchTerm: string = '';

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.loadImages();
    this.loadVideos();
  }

  loadImages(): void {
    this.uploadService
      .getImages(this.currentPage, this.pageSize, this.sortImages)
      .subscribe(
        (data) => {
          this.images = data.content;
          this.totalImages = data.totalElements;
          this.loading = false;
        },
        (error) => {
          console.error('Error loading images:', error);
          this.error = 'Failed to load images.';
          this.loading = false;
        }
      );
  }

  loadVideos(): void {
    this.uploadService
      .getVideos(this.currentPage, this.pageSize, this.sortVideos)
      .subscribe(
        (data) => {
          this.videos = data.content;
          this.totalVideos = data.totalElements;
        },
        (error) => {
          console.error('Error loading videos:', error);
          this.error = 'Failed to load videos.';
        }
      );
  }

  ngOnDestroy(): void {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
    if (this.videoSubscription) {
      this.videoSubscription.unsubscribe();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadImages();
    this.loadVideos();
  }

  onSortChangeImages(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.sort = target.value;
      this.loadImages();
    }
  }

  onSortChangeVideos(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.sort = target.value;
      this.loadVideos();
    }
  }
  

  getImageUrl(id: number): string {
    return `http://localhost:8080/api/upload/images/${id}`;
  }

  getVideoUrl(id: number): string {
    return `http://localhost:8080/api/upload/videos/${id}`;
  }
}
