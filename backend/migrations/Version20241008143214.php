<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241008143214 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE availability DROP CONSTRAINT fk_3fb7a2bf9d86650f');
        $this->addSql('DROP INDEX idx_3fb7a2bf9d86650f');
        $this->addSql('ALTER TABLE availability RENAME COLUMN user_id_id TO user_id');
        $this->addSql('ALTER TABLE availability ADD CONSTRAINT FK_3FB7A2BFA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_3FB7A2BFA76ED395 ON availability (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE availability DROP CONSTRAINT FK_3FB7A2BFA76ED395');
        $this->addSql('DROP INDEX IDX_3FB7A2BFA76ED395');
        $this->addSql('ALTER TABLE availability RENAME COLUMN user_id TO user_id_id');
        $this->addSql('ALTER TABLE availability ADD CONSTRAINT fk_3fb7a2bf9d86650f FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_3fb7a2bf9d86650f ON availability (user_id_id)');
    }
}
