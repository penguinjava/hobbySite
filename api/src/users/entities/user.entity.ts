import { Entity, Column,PrimaryGeneratedColumn,
    CreateDateColumn, Index } from 'typeorm';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn({name: 'user_idx'})
    userIdx: number;

    @Column({ name: 'user_name',length: 50})
    userName: string;

    @Column({ name: 'user_nick_name',length: 100})
    userNickName: string;

    @Index({ unique: true})
    @Column({ name: 'login_id',length: 50})
    loginId: string;

    @Column({name: 'user_pw',length: 255})
    userPw: string;

    @Column({name: 'agree_terms'})
    agreeTerms: boolean;

    @Column({name: 'agree_privacy'})
    agreePrivacy: boolean;

    @Column({name: 'is_admin'})
    isAdmin: boolean;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}