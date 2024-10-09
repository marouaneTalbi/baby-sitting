<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findAllUsersWithProfiles(): array
    {
        return $this->createQueryBuilder('u')
            ->leftJoin('u.profile', 'p')         // Jointure avec la table des profils
            ->leftJoin('u.userServices', 'us')   // Jointure avec la table intermédiaire UserService
            ->leftJoin('us.service', 's')        // Jointure avec la table des services via UserService
            ->addSelect('p')                     // Inclure le profil dans la sélection
            ->addSelect('us')                    // Inclure la relation UserService dans la sélection
            ->addSelect('s')                     // Inclure les services dans la sélection
            ->where('u.role = :role')            // Filtrer par rôle (ROLE_WORKER)
            ->setParameter('role', 'ROLE_WORKER')
            ->getQuery()
            ->getArrayResult();  
    }

    public function findUserAvailabilities(int $userId): array
    {
        return $this->createQueryBuilder('u')
            ->leftJoin('u.availabilities', 'a')
            ->addSelect('a')
            ->where('u.id = :userId')
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getArrayResult();
    }

    //    /**
    //     * @return User[] Returns an array of User objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?User
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
