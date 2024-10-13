<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241010203935 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE notification_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE notification (id INT NOT NULL, parent_id INT DEFAULT NULL, service_provider_id INT DEFAULT NULL, seen BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BF5476CA727ACA70 ON notification (parent_id)');
        $this->addSql('CREATE INDEX IDX_BF5476CAC6C98E06 ON notification (service_provider_id)');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CA727ACA70 FOREIGN KEY (parent_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CAC6C98E06 FOREIGN KEY (service_provider_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE notification_id_seq CASCADE');
        $this->addSql('ALTER TABLE notification DROP CONSTRAINT FK_BF5476CA727ACA70');
        $this->addSql('ALTER TABLE notification DROP CONSTRAINT FK_BF5476CAC6C98E06');
        $this->addSql('DROP TABLE notification');
    }
}
