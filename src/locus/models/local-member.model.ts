import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Locus } from './locus.model';

@Entity({ name: 'rnc_locus_members' })
export class LocusMembers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'urs_taxid' })
  ursTaxid: string;

  @Column({ name: 'region_id' })
  regionId: number;

  @Column({ name: 'membership_status' })
  membershipStatus: string;

  @ManyToOne(() => Locus)
  @JoinColumn({ name: 'locus_id' })
  locus: Locus;

  @Column({ name: 'locus_id' })
  locusId: number;
}
