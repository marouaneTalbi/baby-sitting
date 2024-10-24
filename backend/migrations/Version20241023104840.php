<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241023104840 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE availability ALTER user_id SET NOT NULL');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDEB3750AF4');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEB3750AF4 FOREIGN KEY (parent_id_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE availability ALTER user_id DROP NOT NULL');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT fk_e00ceddeb3750af4');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT fk_e00ceddeb3750af4 FOREIGN KEY (parent_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
