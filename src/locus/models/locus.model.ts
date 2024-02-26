import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LocusMembers } from './local-member.model';

@Entity({ name: 'rnc_locus' })
export class Locus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'assembly_id' })
  assemblyId: string;

  @Column({ name: 'locus_name' })
  locusName: string;

  @Column({ name: 'public_locus_name' })
  publicLocusName: string;

  @Column({ name: 'chromosome' })
  chromosome: string;

  @Column({ name: 'strand' })
  strand: number;

  @Column({ name: 'locus_start' })
  locusStart: number;

  @Column({ name: 'locus_stop' })
  locusStop: number;

  @Column({ name: 'member_count' })
  memberCount: number;

  @OneToMany(() => LocusMembers, (locusMembers) => locusMembers.locus)
  locusMembers: LocusMembers[];
}
