<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241007183709 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE profile DROP CONSTRAINT fk_8157aa0f9d86650f');
        $this->addSql('DROP INDEX uniq_8157aa0f9d86650f');
        $this->addSql('ALTER TABLE profile RENAME COLUMN user_id_id TO user_id');
        $this->addSql('ALTER TABLE profile ADD CONSTRAINT FK_8157AA0FA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8157AA0FA76ED395 ON profile (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE profile DROP CONSTRAINT FK_8157AA0FA76ED395');
        $this->addSql('DROP INDEX UNIQ_8157AA0FA76ED395');
        $this->addSql('ALTER TABLE profile RENAME COLUMN user_id TO user_id_id');
        $this->addSql('ALTER TABLE profile ADD CONSTRAINT fk_8157aa0f9d86650f FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_8157aa0f9d86650f ON profile (user_id_id)');
    }
}
