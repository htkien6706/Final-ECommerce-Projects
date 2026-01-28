import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  uniqueId: string;

  @Column()
  product_description: string;

  @Column()
  preview_image: string;

  @Column()
  detailed_description: string;

  @Column()
  original_price: string;

  @Column()
  discount_price: string;

  @Column()
  total_buyer: number;

  @Column()
  rating: number;

  @Column('simple-array')
  product_images: string[];
}
