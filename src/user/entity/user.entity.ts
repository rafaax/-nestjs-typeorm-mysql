import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Column({
        length: 60
    })
    name: string;

    @Column({
        type: "date"
    })
    birthdate: string;

    @Column({
        length: 50
    })
    cep: string;

    @Column({
        length: 50
    })
    email: string;

    @Column({
        length: 50
    })
    cnpj: string;
    
    @CreateDateColumn({
        type: "timestamp"
    })
    created_at: string;
}